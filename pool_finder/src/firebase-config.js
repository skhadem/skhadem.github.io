// Check if we're in a testing environment (localhost)
// Temporarily disabled - change to true to re-enable test mode
const isTestEnvironment = false; 
// Normal detection (re-enable later):
// const isTestEnvironment = window.location.hostname === 'localhost' || 
//                          window.location.hostname === '127.0.0.1';

let db, poolTablesCollection;

if (isTestEnvironment) {
  // LOCAL TEST MODE
  console.log("🧪 USING LOCAL TEST DATABASE - NO FIREBASE COSTS");
  
  // Create a mock implementation of Firestore using localStorage
  const localDb = {
    // Local storage to persist data between page reloads
    _storage: JSON.parse(localStorage.getItem('poolFinderLocalDb') || '{"poolTables": []}'),
    
    // Save data to localStorage whenever it changes
    _save() {
      localStorage.setItem('poolFinderLocalDb', JSON.stringify(this._storage));
    }
  };
  
  // Mock collection
  class Collection {
    constructor(name) {
      this.name = name;
      // Initialize collection if it doesn't exist
      if (!localDb._storage[name]) {
        localDb._storage[name] = [];
        localDb._save();
      }
    }
  
    // Get a document reference by ID
    doc(id) {
      return {
        id,
        // Get current data if exists
        async get() {
          const data = localDb._storage[this.collectionName].find(doc => doc.id === id);
          return {
            exists: !!data,
            id,
            data() {
              return data ? {...data} : null;
            }
          };
        },
        // Set document data (replace)
        async set(data) {
          const index = localDb._storage[this.collectionName].findIndex(doc => doc.id === id);
          if (index >= 0) {
            localDb._storage[this.collectionName][index] = { id, ...data };
          } else {
            localDb._storage[this.collectionName].push({ id, ...data });
          }
          localDb._save();
          return { id };
        },
        // Update document data (merge)
        async update(data) {
          const index = localDb._storage[this.collectionName].findIndex(doc => doc.id === id);
          if (index >= 0) {
            localDb._storage[this.collectionName][index] = { 
              ...localDb._storage[this.collectionName][index],
              ...data 
            };
            localDb._save();
          }
          return { id };
        },
        collectionName: this.name
      };
    }
  
    // Get all documents in a collection
    async get() {
      const docs = localDb._storage[this.name] || [];
      return {
        empty: docs.length === 0,
        docs: docs.map(doc => ({
          id: doc.id,
          data() {
            return {...doc};
          }
        }))
      };
    }
  }
  
  // Use the mock implementation
  db = {
    collection(name) {
      return new Collection(name);
    }
  };
  
  poolTablesCollection = db.collection('poolTables');
  
  // Add test control buttons to the page
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    if (container) {
      // Create test banner
      const banner = document.createElement('div');
      banner.className = 'test-banner';
      banner.style.backgroundColor = '#ffdd57';
      banner.style.color = '#000';
      banner.style.textAlign = 'center';
      banner.style.padding = '10px';
      banner.style.fontWeight = 'bold';
      banner.style.borderRadius = '4px';
      banner.style.marginBottom = '10px';
      banner.textContent = '🧪 TEST MODE - Using Local Storage Database - No Firebase Costs';
      
      // Create test actions container
      const actions = document.createElement('div');
      actions.className = 'test-actions';
      actions.style.display = 'flex';
      actions.style.justifyContent = 'center';
      actions.style.gap = '10px';
      actions.style.marginBottom = '10px';
      
      // Clear data button
      const clearBtn = document.createElement('button');
      clearBtn.textContent = 'Clear Test Data';
      clearBtn.style.backgroundColor = '#ff3860';
      clearBtn.style.color = 'white';
      clearBtn.style.border = 'none';
      clearBtn.style.padding = '5px 10px';
      clearBtn.style.borderRadius = '4px';
      clearBtn.style.cursor = 'pointer';
      clearBtn.onclick = () => {
        if (confirm('Are you sure you want to clear all test data? This cannot be undone.')) {
          localStorage.removeItem('poolFinderLocalDb');
          location.reload();
        }
      };
      
      // Export data button
      const exportBtn = document.createElement('button');
      exportBtn.textContent = 'Export Test Data';
      exportBtn.style.backgroundColor = '#3273dc';
      exportBtn.style.color = 'white';
      exportBtn.style.border = 'none';
      exportBtn.style.padding = '5px 10px';
      exportBtn.style.borderRadius = '4px';
      exportBtn.style.cursor = 'pointer';
      exportBtn.onclick = () => {
        const data = localStorage.getItem('poolFinderLocalDb') || '{}';
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pool-finder-test-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };
      
      // Import data button
      const importBtn = document.createElement('button');
      importBtn.textContent = 'Import Test Data';
      importBtn.style.backgroundColor = '#23d160';
      importBtn.style.color = 'white';
      importBtn.style.border = 'none';
      importBtn.style.padding = '5px 10px';
      importBtn.style.borderRadius = '4px';
      importBtn.style.cursor = 'pointer';
      importBtn.onclick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = e => {
          const file = e.target.files[0];
          if (!file) return;
          
          const reader = new FileReader();
          reader.onload = event => {
            try {
              // Validate JSON before storing
              const data = JSON.parse(event.target.result);
              localStorage.setItem('poolFinderLocalDb', JSON.stringify(data));
              alert('Test data imported successfully!');
              location.reload();
            } catch (err) {
              alert('Error importing data: ' + err.message);
            }
          };
          reader.readAsText(file);
        };
        input.click();
      };
      
      // Add buttons to actions
      actions.appendChild(clearBtn);
      actions.appendChild(exportBtn);
      actions.appendChild(importBtn);
      
      // Add banner and actions to container
      container.insertBefore(actions, container.firstChild);
      container.insertBefore(banner, container.firstChild);
      
      // Update title to indicate test mode
      document.title += ' (TEST MODE)';
    }
  });
} else {
  // PRODUCTION MODE
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDucGfQxQqGbGfwvrWkWF7A-q2Uj5LvUuI",
    authDomain: "pool-finder-6708a.firebaseapp.com",
    projectId: "pool-finder-6708a",
    storageBucket: "pool-finder-6708a.firebasestorage.app",
    messagingSenderId: "877896863351",
    appId: "1:877896863351:web:cd2322b5427659f3118072"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Initialize Firestore
  db = firebase.firestore();
  
  // Collection references
  poolTablesCollection = db.collection('poolTables');
}

// Export the database and collections for use in other files
window.db = db;
window.poolTablesCollection = poolTablesCollection;
