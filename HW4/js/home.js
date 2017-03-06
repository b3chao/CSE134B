// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyBTFeLiA_68jNfN2AQN_GIudQSZd1mKalY",
//   authDomain: "myproj134b.firebaseapp.com",
//   databaseURL: "https://myproj134b.firebaseio.com",
//   storageBucket: "myproj134b.appspot.com",
//   messagingSenderId: "746940840004"
// };

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBSqnmEYkvUCT084y_NPpJeL9-TofpOsq4",
    authDomain: "cse134b-all.firebaseapp.com",
    databaseURL: "https://cse134b-all.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "295582276921"
};
firebase.initializeApp(config);

var logout = function() {
  firebase.auth().signOut().then(function() {
    window.location = './login.html';
  }, function(error) {
    // An error happened.
  });
}
