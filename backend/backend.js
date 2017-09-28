var firebase = require('firebase');

var val = 1;
config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
}

let updateAndSend = function(callback) {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(config);
    }
    
    firebase.database().ref().once('value').then(function(snapshot) {
        newVal = snapshot.val().count + 1;
        firebase.database().ref().update({'count': newVal})
        callback(newVal);
    });
}

module.exports = {
    handler: function(callback) {
        updateAndSend(function(val) {
            callback(null, val)
        });
    }
}