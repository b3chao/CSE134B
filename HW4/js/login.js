// Initialize Firebase
var config = {
  apiKey: "AIzaSyBTFeLiA_68jNfN2AQN_GIudQSZd1mKalY",
  authDomain: "myproj134b.firebaseapp.com",
  databaseURL: "https://myproj134b.firebaseio.com",
  storageBucket: "myproj134b.appspot.com",
  messagingSenderId: "746940840004"
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
