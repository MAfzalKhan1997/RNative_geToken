import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA0At9hcnhBiBi5VeMwhi8L0lbUzWlN2Lw",
    authDomain: "getoken-mak.firebaseapp.com",
    databaseURL: "https://getoken-mak.firebaseio.com",
    projectId: "getoken-mak",
    storageBucket: "getoken-mak.appspot.com",
    messagingSenderId: "430942126171"
};
firebase.initializeApp(firebaseConfig);

export default firebase;