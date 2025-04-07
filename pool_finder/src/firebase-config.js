// Firebase configuration
// IMPORTANT: Replace with your own Firebase project config when setting up
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
const db = firebase.firestore();

// Collection references
const poolTablesCollection = db.collection('poolTables');

// Export the database and collections for use in other files
window.db = db;
window.poolTablesCollection = poolTablesCollection;
