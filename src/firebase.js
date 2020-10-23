import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAgevd0LoIwVf_BSrbEtEVd_iE7sV0fmmw",
    authDomain: "to-do-list-app-3d20f.firebaseapp.com",
    databaseURL: "https://to-do-list-app-3d20f.firebaseio.com",
    projectId: "to-do-list-app-3d20f",
    storageBucket: "to-do-list-app-3d20f.appspot.com",
    messagingSenderId: "214057619383",
    appId: "1:214057619383:web:897fc2f5e0ff7e26856232",
    measurementId: "G-R8LPDZ9JX1"
});

const db = firebaseApp.firestore();
export default db;