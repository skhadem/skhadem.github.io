# NYC Pool Finder

A simple web application that helps you find pool tables near NYC subway stations.

## Features

- Select a subway line using the colored buttons
- Choose a specific subway station from the dropdown
- View the station location on the transit-focused map
- See nearby pool tables displayed as markers
- Click on markers to view details about each pool table location
- Read reviews for each pool table venue
- Leave your own ratings and reviews for venues

## Default Settings

By default, the application shows:
- The L subway line
- The Jefferson Street station
- Pool tables in the vicinity

## Technology Stack

- HTML5, CSS3, and JavaScript (vanilla)
- Transit-focused map with Thunderforest API (with OpenStreetMap fallback)
- Leaflet.js for interactive maps
- Firebase Firestore for database
- Fully client-side application with no backend server required

## Deployment Instructions

### Setup Firebase

1. Create a Firebase account at [firebase.google.com](https://firebase.google.com/)
2. Create a new project in the Firebase Console
3. Set up Firestore database in your project
4. Get your Firebase configuration (Project settings -> General -> Your apps -> Firebase SDK snippet)
5. Update the `src/firebase-config.js` file with your Firebase project configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Deploy to GitHub Pages

1. Create a new repository on GitHub or use an existing one
2. Copy the contents of the `public` and `src` folders to your repository
3. Ensure both folders are at the root level or in a subdirectory of your GitHub Pages site
4. If deploying to a subfolder, all paths are relative so they should work automatically
5. Push your changes to GitHub

### Local Development

To run the application locally:

1. Open the `public/index.html` file in your browser
2. Or use a local web server:
   ```
   npx serve public
   ```

## Adding Pool Locations

To add more pool table locations:

1. Add new entries to the `poolTables` array in `src/subway-data.js`
2. Each entry should have:
   - `id`: Unique identifier
   - `name`: Name of the venue
   - `address`: Street address
   - `lat` & `lng`: Geographic coordinates
   - `rating`: Initial rating (1-5)

New locations will be automatically added to Firebase when the app first loads.

## Future Enhancements

- Add more pool table locations
- Add search functionality by neighborhood or address
- Implement filtering by pool table features
- Add real-time data for subway arrivals
- Add walking directions from subway station to pool table venues
- Allow users to upload photos of venues