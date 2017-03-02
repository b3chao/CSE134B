// Initialize Firebase
var config = {
  apiKey: "AIzaSyBTFeLiA_68jNfN2AQN_GIudQSZd1mKalY",
  authDomain: "myproj134b.firebaseapp.com",
  databaseURL: "https://myproj134b.firebaseio.com",
  storageBucket: "myproj134b.appspot.com",
  messagingSenderId: "746940840004"
};
firebase.initializeApp(config);

var logout = function() {
  firebase.auth().signOut().then(function() {
    window.location = './login.html';
  }, function(error) {
    // An error happened.
  });
}
