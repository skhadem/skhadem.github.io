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
    setupAddPlaceModal();
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
    
    // Function to create a custom 8-ball pool table icon based on verification status
    function createPoolTableIcon(verified) {
        console.log('Creating icon with verified =', verified);
        
        // Use alpha transparency for unverified locations
        const opacity = verified ? '1' : '0.6';
        const bgColor = verified ? 'black' : '#555555';
        const questionMark = verified ? '' : `<div style="position: absolute; top: -7px; right: -6px; background-color: #FFC107; color: #000; font-size: 10px; font-weight: bold; width: 14px; height: 14px; border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: 0 1px 2px rgba(0,0,0,0.3);">?</div>`;
        
        return L.divIcon({
            className: 'pool-table-marker',
            html: `<div style="position: relative; background-color: ${bgColor}; width: 24px; height: 24px; border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.4); opacity: ${opacity};">
                    <div style="position: relative; background-color: white; width: 10px; height: 10px; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
                        <span style="position: absolute; color: black; font-size: 8px; font-weight: bold; font-family: Arial;">8</span>
                    </div>
                    ${questionMark}
                   </div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
    }
    
    poolTablesData.forEach(table => {
        // Create icon based on verification status
        const isVerified = table.verified === true;
        
        // Debug verification status
        console.log(`Marker for ${table.name}:`, { 
            id: table.id,
            verified: table.verified, 
            isVerified: isVerified,
            verificationCount: table.verificationCount 
        });
        
        const poolTableIcon = createPoolTableIcon(isVerified);
        
        const marker = L.marker([table.lat, table.lng], {
            icon: poolTableIcon,
            title: table.name
        }).addTo(markerLayer);
        
        // Create popup with name, hours, verification status, and Google Maps link
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(table.name + ' ' + table.address)}`;
        
        // Verification badge
        const verificationBadge = table.verified ? 
            `<span style="background-color: #4CAF50; color: white; padding: 2px 5px; border-radius: 3px; font-size: 10px; margin-left: 5px;">Verified</span>` : 
            `<span style="background-color: #FFC107; color: black; padding: 2px 5px; border-radius: 3px; font-size: 10px; margin-left: 5px;">Needs Verification</span>`;
        
        let popupContent = `
            <strong>${table.name}</strong> ${verificationBadge}<br>
            <small>${table.address}</small><br>
        `;
        
        // Add hours if available
        if (table.hours) {
            popupContent += `<small><strong>Hours:</strong> ${table.hours}</small><br>`;
        }
        
        // Add Google Maps link
        popupContent += `<a href="${googleMapsUrl}" target="_blank" style="display:inline-block; margin-top:5px; font-size:12px;">Open in Google Maps</a>`;
        
        marker.bindPopup(popupContent);
        
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
    
    // Handle rating display - show "No ratings yet" for new places
    if (venue.ratingDisplay) {
        document.getElementById('venue-rating').textContent = venue.ratingDisplay;
    } else if (venue.rating === 0 || !venue.rating) {
        document.getElementById('venue-rating').textContent = 'No ratings yet';
    } else {
        document.getElementById('venue-rating').textContent = `Rating: ${venue.rating}/5`;
    }
    
    // Add additional venue info if available
    let additionalInfo = '';
    
    if (venue.hours) {
        additionalInfo += `<p><strong>Hours:</strong> ${venue.hours}</p>`;
    }
    
    if (venue.poolTables) {
        additionalInfo += `<p><strong>Pool Tables:</strong> ${venue.poolTables}</p>`;
    }
    
    if (venue.tableRate) {
        additionalInfo += `<p><strong>Table Rate:</strong> ${venue.tableRate}</p>`;
    }
    
    // Add Google Maps link
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' ' + venue.address)}`;
    additionalInfo += `<p><a href="${googleMapsUrl}" target="_blank" class="maps-link">Open in Google Maps</a></p>`;
    
    // Find or create the additional info container
    let infoContainer = document.getElementById('venue-additional-info');
    if (!infoContainer) {
        infoContainer = document.createElement('div');
        infoContainer.id = 'venue-additional-info';
        infoContainer.className = 'venue-additional-info';
        document.querySelector('.venue-meta').appendChild(infoContainer);
    }
    
    infoContainer.innerHTML = additionalInfo;
    
    // Add verification controls
    let verificationContainer = document.getElementById('verification-controls');
    if (!verificationContainer) {
        verificationContainer = document.createElement('div');
        verificationContainer.id = 'verification-controls';
        verificationContainer.className = 'verification-controls';
        infoContainer.insertAdjacentElement('afterend', verificationContainer);
    }
    
    // Determine verification status
    const isVerified = venue.verified === true;
    const verificationCount = venue.verificationCount || 0;
    
    // Create verification section
    const verificationHTML = `
        <h4>Pool Table Verification</h4>
        <div class="verification-status">
            <span class="verification-badge ${isVerified ? 'verified' : 'unverified'}">
                ${isVerified ? 'Verified' : 'Needs Verification'}
            </span>
            <span class="verification-count">
                ${verificationCount} ${verificationCount === 1 ? 'person has' : 'people have'} verified this location
            </span>
        </div>
        <div class="verification-buttons">
            <button id="btn-verify" class="btn-verify">
                Yes, There's a Pool Table Here
            </button>
            <button id="btn-unverify" class="btn-unverify">
                No Pool Table Here
            </button>
        </div>
    `;
    
    verificationContainer.innerHTML = verificationHTML;
    
    // Add event listeners for verification buttons
    document.getElementById('btn-verify').addEventListener('click', () => {
        verifyPoolTable(venue.id, true);
    });
    
    document.getElementById('btn-unverify').addEventListener('click', () => {
        verifyPoolTable(venue.id, false);
    });
    
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

// Handle pool table verification
async function verifyPoolTable(tableId, isVerifying) {
    try {
        // Find the table in local data
        const tableIndex = poolTablesData.findIndex(t => t.id === tableId);
        if (tableIndex === -1) {
            console.error('Pool table not found:', tableId);
            return;
        }
        
        const table = poolTablesData[tableIndex];
        
        // Update verification data
        let verificationCount = table.verificationCount || 0;
        
        // Log initial values for debugging
        console.log('Before update:', { 
            id: table.id, 
            verified: table.verified, 
            count: verificationCount 
        });
        
        if (isVerifying) {
            // User is verifying the pool table exists
            verificationCount++;
            table.verified = verificationCount >= 1; // Trust users more - require only 1 verification
        } else {
            // User is reporting no pool table
            verificationCount = Math.max(0, verificationCount - 2); // Subtract 2 from count (stronger weight for negative reports)
            table.verified = verificationCount >= 1; // Consistent threshold
        }
        
        table.verificationCount = verificationCount;
        
        // Log updated values for debugging
        console.log('After update:', { 
            id: table.id, 
            verified: table.verified, 
            count: verificationCount 
        });
        
        // Update the Firebase document
        await poolTablesCollection.doc(tableId).update({
            verified: table.verified,
            verificationCount: verificationCount
        });
        
        // Update the local data
        poolTablesData[tableIndex] = table;
        
        // Refresh the map markers - first clear all markers
        markerLayer.clearLayers();
        
        // Then add all markers again
        addPoolTableMarkers();
        
        // Refresh the venue details if this is the currently selected venue
        if (selectedVenue && selectedVenue.id === tableId) {
            showVenueDetails(table);
        }
        
        // Show feedback to the user
        alert(`Thank you for ${isVerifying ? 'verifying' : 'reporting'} this location!`);
        
    } catch (error) {
        console.error('Error updating verification status:', error);
        alert('Error updating verification. Please try again.');
    }
}

// Set up the add place modal
function setupAddPlaceModal() {
    const addPlaceBtn = document.getElementById('add-place-btn');
    const modal = document.getElementById('add-place-modal');
    const closeBtn = document.getElementById('modal-close');
    const searchInput = document.getElementById('place-search');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    const poolInfoForm = document.getElementById('pool-info-form');
    const cancelBtn = document.getElementById('cancel-add');
    const newLocationForm = document.getElementById('new-location-form');
    
    // Initialize Places Autocomplete service
    const placesService = new google.maps.places.PlacesService(document.createElement('div'));
    
    // Open modal
    addPlaceBtn.addEventListener('click', () => {
        modal.classList.add('active');
        searchInput.focus();
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        resetForm();
    });
    
    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            resetForm();
        }
    });
    
    // Cancel button
    cancelBtn.addEventListener('click', () => {
        poolInfoForm.style.display = 'none';
        searchResults.style.display = 'block';
    });
    
    // Handle place search
    searchButton.addEventListener('click', () => {
        searchForPlaces();
    });
    
    // Search on Enter key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchForPlaces();
        }
    });
    
    // Search for places
    function searchForPlaces() {
        const query = searchInput.value.trim();
        if (!query) return;
        
        // Set search area near the currently selected station
        const station = subwayData[selectedLine].stations.find(s => s.name === selectedStation);
        const location = new google.maps.LatLng(station.coords.lat, station.coords.lng);
        
        // Search parameters
        const request = {
            query: query + ' near ' + selectedStation,
            location: location,
            radius: 1500, // Search within 1.5km
            types: ['bar', 'restaurant', 'night_club', 'establishment']
        };
        
        // Show loading message
        searchResults.innerHTML = '<div class="search-message">Searching...</div>';
        
        // Perform the search
        placesService.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
                displaySearchResults(results);
            } else {
                searchResults.innerHTML = '<div class="search-message">No results found. Try a different search term.</div>';
            }
        });
    }
    
    // Display search results
    function displaySearchResults(places) {
        searchResults.innerHTML = '';
        
        places.forEach(place => {
            const placeItem = document.createElement('div');
            placeItem.className = 'search-result-item';
            placeItem.innerHTML = `
                <h3>${place.name}</h3>
                <p>${place.formatted_address}</p>
            `;
            
            // When a place is selected
            placeItem.addEventListener('click', () => {
                // Get place details to capture hours
                placesService.getDetails({
                    placeId: place.place_id,
                    fields: ['name', 'formatted_address', 'geometry', 'opening_hours']
                }, (placeDetails, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        selectPlace(placeDetails, place);
                    } else {
                        // If details request fails, use original place data
                        selectPlace(place);
                    }
                });
            });
            
            searchResults.appendChild(placeItem);
        });
    }
    
    // Select a place to add
    function selectPlace(place, originalPlace) {
        // Hide search results, show pool info form
        searchResults.style.display = 'none';
        poolInfoForm.style.display = 'block';
        
        // Get coordinates
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        
        // Get hours if available
        let hours = '';
        if (place.opening_hours && place.opening_hours.weekday_text) {
            hours = place.opening_hours.weekday_text.join(', ');
        }
        
        // Set hidden form values
        document.getElementById('place-id').value = place.place_id || originalPlace.place_id;
        document.getElementById('place-name').value = place.name;
        document.getElementById('place-address').value = place.formatted_address || originalPlace.formatted_address;
        document.getElementById('place-lat').value = lat;
        document.getElementById('place-lng').value = lng;
        
        // Set a default for pool tables
        document.getElementById('pool-tables').value = '1';
    }
    
    // Handle form submission
    newLocationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const placeId = document.getElementById('place-id').value;
        const placeName = document.getElementById('place-name').value;
        const placeAddress = document.getElementById('place-address').value;
        const placeLat = parseFloat(document.getElementById('place-lat').value);
        const placeLng = parseFloat(document.getElementById('place-lng').value);
        const poolTables = parseInt(document.getElementById('pool-tables').value);
        const tableRate = document.getElementById('table-rate').value;
        
        // Create new pool table object
        const newPoolTable = {
            id: placeId.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
            name: placeName,
            address: placeAddress,
            lat: placeLat,
            lng: placeLng,
            rating: 0, // No rating yet
            ratingDisplay: "No ratings yet",
            poolTables: poolTables,
            tableRate: tableRate,
            reviews: [],
            verified: true, // Trust the user adding the place
            verificationCount: 1 // One verification from the person who added it
        };
        
        try {
            // Add to Firebase
            await poolTablesCollection.doc(newPoolTable.id).set({
                name: newPoolTable.name,
                address: newPoolTable.address,
                lat: newPoolTable.lat,
                lng: newPoolTable.lng,
                rating: 0,
                ratingDisplay: "No ratings yet",
                poolTables: newPoolTable.poolTables,
                tableRate: newPoolTable.tableRate,
                reviews: [],
                verified: true,
                verificationCount: 1
            });
            
            // Add to local data
            poolTablesData.push(newPoolTable);
            
            // Update map - first clear all markers
            markerLayer.clearLayers();
            
            // Then add all markers again
            addPoolTableMarkers();
            
            // Close modal and reset form
            modal.classList.remove('active');
            resetForm();
            
            // Show success message
            alert(`${placeName} has been added to the map!`);
            
        } catch (error) {
            console.error('Error adding new pool table:', error);
            alert('Error adding location. Please try again.');
        }
    });
    
    // Reset the form
    function resetForm() {
        searchInput.value = '';
        searchResults.innerHTML = '<div class="search-message">Search for places to add</div>';
        searchResults.style.display = 'block';
        poolInfoForm.style.display = 'none';
        document.getElementById('new-location-form').reset();
    }
}