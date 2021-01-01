import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnPao-za91kPn2_FNM6RB5sREbYPfgC1c",
  authDomain: "imessage-cloned-app.firebaseapp.com",
  projectId: "imessage-cloned-app",
  storageBucket: "imessage-cloned-app.appspot.com",
  messagingSenderId: "313678299996",
  appId: "1:313678299996:web:15c0782c31a55d0ed9b799",
  measurementId: "G-ZH2FZSVPNY"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;