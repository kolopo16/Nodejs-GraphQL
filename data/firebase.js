var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyDSthG_ie8NJs-hXjsMu2aeQU3HruAXCsc",
    authDomain: "mypkeeper.firebaseapp.com",
    databaseURL: "https://mypkeeper.firebaseio.com",
    projectId: "mypkeeper",
    storageBucket: "mypkeeper.appspot.com",
    messagingSenderId: "132418657213"
};

firebase.initializeApp(config);

module.exports = firebase;