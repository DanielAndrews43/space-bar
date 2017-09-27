var firebase = require('firebase');
var config = require('./config.json');

var val = 1;

let updateAndSend = function(cb) {
    if (firebase.apps.length === 0) {
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