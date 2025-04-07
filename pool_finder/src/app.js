// Global variables
let map;
let markerLayer;
let poolTablesData = []; // Will be populated from API
let selectedLine = 'L'; // Default to L line
let selectedStation = 'Jefferson Street'; // Default to Jefferson Street
let selectedVenue = null; // Currently selected venue

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    fetchPoolTablesData();
    createSubwayButtons();
    setupReviewForm();
});

// Fetch pool tables data from Firebase
async function fetchPoolTablesData() {
    try {
        // Get data from Firestore
        const snapshot = await poolTablesCollection.get();
        
        if (snapshot.empty) {
            console.log('No pool tables found in database, using default data');
            // If no data in Firestore, add our initial data and use it
            await addDefaultPoolTables();
            poolTablesData = poolTables;
        } else {
            // Convert Firestore documents to our data format
            poolTablesData = snapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() };
            });
        }
        
        // If map is already initialized, update the markers
        if (map) {
            addPoolTableMarkers();
        }
    } catch (error) {
        console.error('Error fetching pool tables data:', error);
        // Fallback to local data if Firebase fails
        poolTablesData = poolTables;
    }
}

// Add default pool table data to Firestore if the collection is empty
async function addDefaultPoolTables() {
    try {
        for (const table of poolTables) {
            // Use the existing id as the document ID
            await poolTablesCollection.doc(table.id).set({
                name: table.name,
                address: table.address,
                lat: table.lat,
                lng: table.lng,
                rating: table.rating,
                reviews: []
            });
        }
        console.log('Added default pool table data to Firestore');
    } catch (error) {
        console.error('Error adding default data to Firestore:', error);
    }
}

// Create subway line buttons
function createSubwayButtons() {
    const buttonContainer = document.getElementById('subway-buttons');
    
    // Create a button for each subway line
    for (const line in subwayData) {
        const button = document.createElement('button');
        button.innerText = line;
        button.className = 'subway-button';
        button.style.backgroundColor = subwayData[line].color;
        
        // Highlight the default selected line
        if (line === selectedLine) {
            button.style.boxShadow = '0 0 0 3px black';
        }
        
        // Add click event listener
        button.addEventListener('click', () => {
            // Remove highlight from all buttons
            document.querySelectorAll('.subway-button').forEach(btn => {
                btn.style.boxShadow = 'none';
            });
            
            // Highlight the selected button
            button.style.boxShadow = '0 0 0 3px black';
            
            // Update selected line and populate stations
            selectedLine = line;
            populateStations(line);
        });
        
        buttonContainer.appendChild(button);
    }
    
    // Populate stations for the default line
    populateStations(selectedLine);
}

// Populate stations dropdown for the selected line
function populateStations(line) {
    const stationSelect = document.getElementById('station-select');
    stationSelect.innerHTML = ''; // Clear previous options
    stationSelect.disabled = false;
    
    // Get stations for the selected line
    const stations = subwayData[line].stations;
    
    // Add options for each station
    stations.forEach(station => {
        const option = document.createElement('option');
        option.value = station.name;
        option.innerText = station.name;
        stationSelect.appendChild(option);
    });
    
    // If the default station is on this line, select it
    if (stations.some(station => station.name === selectedStation)) {
        stationSelect.value = selectedStation;
    } else {
        // Otherwise select the first station
        selectedStation = stations[0].name;
        stationSelect.value = selectedStation;
    }
    
    // Add change event listener
    stationSelect.addEventListener('change', function() {
        selectedStation = this.value;
        updateMap();
    });
    
    // Initialize/update the map
    initMap();
}

// Initialize the map
function initMap() {
    // Find the selected station coordinates
    const station = subwayData[selectedLine].stations.find(s => s.name === selectedStation);
    
    if (!station) {
        console.error('Station not found');
        return;
    }
    
    // If map doesn't exist, create it
    if (!map) {
        map = L.map('map').setView([station.coords.lat, station.coords.lng], 15);
        
        // Try to use a transit-oriented map layer
        const transitLayer = L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors, Maps © Thunderforest'
        });
        
        // Fallback to standard OpenStreetMap if transit layer fails
        const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        });
        
        // Try to add the transit layer first, fall back to OSM if it fails
        transitLayer.addTo(map);
        transitLayer.on('tileerror', function() {
            console.warn('Transit layer failed, falling back to OSM');
            if (!map.hasLayer(osmLayer)) {
                osmLayer.addTo(map);
            }
        });
        
        // Create a marker layer group
        markerLayer = L.layerGroup().addTo(map);
    } else {
        // Otherwise just update the center
        map.setView([station.coords.lat, station.coords.lng], 15);
        
        // Clear all markers
        markerLayer.clearLayers();
    }
    
    // Add station marker
    const stationIcon = L.divIcon({
        className: 'subway-station-marker',
        html: `<div style="background-color: ${subwayData[selectedLine].color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid black;"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    const stationMarker = L.marker([station.coords.lat, station.coords.lng], {
        icon: stationIcon,
        title: station.name
    }).addTo(markerLayer);
    
    // Add station popup
    stationMarker.bindPopup(`<strong>${station.name}</strong><br>Subway Line: ${selectedLine}`);
    
    // Add pool table markers
    addPoolTableMarkers();
    
    // Reset venue details section
    hideVenueDetails();
}

// Add markers for nearby pool tables
function addPoolTableMarkers() {
    if (poolTablesData.length === 0) {
        console.log('No pool tables data available yet');
        return;
    }
    
    // Create a custom pool table icon
    const poolTableIcon = L.divIcon({
        className: 'pool-table-marker',
        html: `<div style="background-color: green; width: 20px; height: 20px; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
                <div style="background-color: white; width: 10px; height: 10px;"></div>
               </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    poolTablesData.forEach(table => {
        const marker = L.marker([table.lat, table.lng], {
            icon: poolTableIcon,
            title: table.name
        }).addTo(markerLayer);
        
        // Add simple popup with just the name
        marker.bindPopup(`<strong>${table.name}</strong>`);
        
        // Add click event to show venue details below the map
        marker.on('click', () => {
            showVenueDetails(table);
            selectedVenue = table;
        });
    });
}

// Show venue details in the section below the map
function showVenueDetails(venue) {
    // Hide placeholder and show content
    document.querySelector('.venue-placeholder').style.display = 'none';
    document.querySelector('.venue-content').style.display = 'block';
    
    // Fill in venue details
    document.getElementById('venue-name').textContent = venue.name;
    document.getElementById('venue-address').textContent = venue.address;
    document.getElementById('venue-rating').textContent = `Rating: ${venue.rating}/5`;
    
    // Update reviews section
    const reviewsContainer = document.getElementById('existing-reviews');
    reviewsContainer.innerHTML = '';
    
    if (venue.reviews && venue.reviews.length > 0) {
        venue.reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
                <p>
                    <span class="review-author">${review.author}</span>
                    <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</span>
                    <span class="review-date">${review.date}</span>
                </p>
                <p class="review-comment">${review.comment}</p>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    } else {
        reviewsContainer.innerHTML = '<p>No reviews yet. Be the first to review!</p>';
    }
    
    // Set up the review form for this venue
    document.getElementById('review-form').setAttribute('data-venue-id', venue.id);
    
    // Clear any previous review status
    document.getElementById('review-status').textContent = '';
    document.getElementById('review-status').className = 'review-status';
    
    // Scroll to venue details
    document.getElementById('venue-details').scrollIntoView({ behavior: 'smooth' });
}

// Hide venue details
function hideVenueDetails() {
    document.querySelector('.venue-placeholder').style.display = 'block';
    document.querySelector('.venue-content').style.display = 'none';
    selectedVenue = null;
}

// Set up review form submission
function setupReviewForm() {
    const form = document.getElementById('review-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const venueId = form.getAttribute('data-venue-id');
        if (!venueId) {
            console.error('No venue ID found');
            return;
        }
        
        await submitReview(venueId);
    });
}

// Submit a new review
async function submitReview(poolTableId) {
    const authorInput = document.getElementById('author');
    const ratingSelect = document.getElementById('rating');
    const commentTextarea = document.getElementById('comment');
    const statusDiv = document.getElementById('review-status');
    
    // Validate inputs
    if (!authorInput.value || !ratingSelect.value || !commentTextarea.value) {
        statusDiv.textContent = 'Please fill in all fields';
        statusDiv.className = 'review-status error';
        return;
    }
    
    // Prepare review data
    const reviewData = {
        author: authorInput.value,
        rating: parseInt(ratingSelect.value),
        comment: commentTextarea.value,
        date: new Date().toISOString().split('T')[0] // Today's date in YYYY-MM-DD format
    };
    
    try {
        statusDiv.textContent = 'Submitting...';
        statusDiv.className = 'review-status info';
        
        // Get a reference to the specific pool table document
        const poolTableRef = poolTablesCollection.doc(poolTableId);
        
        // Get the current document
        const doc = await poolTableRef.get();
        
        if (!doc.exists) {
            throw new Error('Pool table not found');
        }
        
        // Get current data
        const poolTableData = doc.data();
        
        // Add new review to the reviews array
        const reviews = poolTableData.reviews || [];
        reviews.push(reviewData);
        
        // Calculate new rating average
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const newRating = Math.round((totalRating / reviews.length) * 10) / 10;
        
        // Update the document with new review and rating
        await poolTableRef.update({
            reviews: reviews,
            rating: newRating
        });
        
        // Get updated pool table data
        const updatedDoc = await poolTableRef.get();
        const updatedPoolTable = { id: updatedDoc.id, ...updatedDoc.data() };
        
        // Update the local data
        const tableIndex = poolTablesData.findIndex(t => t.id === poolTableId);
        if (tableIndex !== -1) {
            poolTablesData[tableIndex] = updatedPoolTable;
            
            // Update the venue details display
            if (selectedVenue && selectedVenue.id === poolTableId) {
                showVenueDetails(updatedPoolTable);
            }
        }
        
        // Clear form
        authorInput.value = '';
        ratingSelect.value = '';
        commentTextarea.value = '';
        
        statusDiv.textContent = 'Review submitted successfully!';
        statusDiv.className = 'review-status success';
        
        // Refresh the map markers
        addPoolTableMarkers();
    } catch (error) {
        console.error('Error submitting review:', error);
        statusDiv.textContent = `Error: ${error.message}`;
        statusDiv.className = 'review-status error';
    }
}

// Update the map when selection changes
function updateMap() {
    initMap();
}