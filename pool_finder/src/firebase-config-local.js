// Local Firebase mock for testing 
console.log("🧪 USING LOCAL TEST DATABASE - NO FIREBASE COSTS");

// Create a mock implementation of Firestore
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

// Mock Firestore
const db = {
  collection(name) {
    return new Collection(name);
  }
};

// Mock the Firebase global
window.firebase = {
  initializeApp() {
    return {};
  },
  firestore() {
    return db;
  }
};

// Export the database and collections for use in other files
window.db = db;
window.poolTablesCollection = db.collection('poolTables');