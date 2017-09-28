var firebase = require('firebase');
var config = require('./config.json');

var val = 1;

let updateAndSend = function(cb) {
    if (firebase.apps.length === 0) {
        if (!config) {
            config = {
                "apiKey": process.env.apiKey,
                "authDomain": process.env.authDomain,
                "databaseURL": process.env.databaseURL,
                "projectId": process.env.projectId,
                "storageBucket": process.env.storageBucket,
                "messagingSenderId": process.env.messagingSenderId
            }
        }
        firebase.initializeApp(config);
    }
    
    firebase.database().ref().once('value').then(function(snapshot) {
        newVal = snapshot.val().count + 1;
        firebase.database().ref().update({'count': newVal})
        cb(newVal);
    });
}

module.exports = {
    handler: function(cystal) {
        updateAndSend(function(val) {
            cystal(null, val)
        });
    }
}