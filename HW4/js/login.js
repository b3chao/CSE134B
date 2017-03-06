// Initialize Firebase
var config = {
    apiKey: "AIzaSyBSqnmEYkvUCT084y_NPpJeL9-TofpOsq4",
    authDomain: "cse134b-all.firebaseapp.com",
    databaseURL: "https://cse134b-all.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "295582276921"
};
firebase.initializeApp(config);

var handleSignup = function() {
  var email = document.getElementById('email').value;
  var pwd = document.getElementById('pwd').value;
  firebase.auth().createUserWithEmailAndPassword(email, pwd).catch(function(error) {
    document.getElementById('error-msg').innerHTML = error.message;
  });
}

var handleLogin = function() {
  var email = document.getElementById('email').value;
  var pwd = document.getElementById('pwd').value;
  firebase.auth().signInWithEmailAndPassword(email, pwd).catch(function(error) {
    document.getElementById('error-msg').innerHTML = error.message;
  });
}

var handleGoogleLogin = function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var user = result.user;
  }).catch(function(error) {
    document.getElementById('error-msg').innerHTML = error.message;
  });
}

var logout = function () {
    firebase.auth().signOut().then(function () {
        console.log("signout successful");
        window.location = './login.html';
    }, function (error) {
        // An error happened.
    });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user.email);
    window.location = './home.html';
  }
});
