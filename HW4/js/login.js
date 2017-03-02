// Initialize Firebase
var config = {
  apiKey: "AIzaSyBTFeLiA_68jNfN2AQN_GIudQSZd1mKalY",
  authDomain: "myproj134b.firebaseapp.com",
  databaseURL: "https://myproj134b.firebaseio.com",
  storageBucket: "myproj134b.appspot.com",
  messagingSenderId: "746940840004"
};
firebase.initializeApp(config);

var signup = function(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    document.getElementById('error-msg').innerHTML = error.message;
    console.log(error);
  });
}

var login = function(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    document.getElementById('error-msg').innerHTML = error.message;
    console.log(error);
  });
}

var handleSignup = function() {
  var email = document.getElementById('email').value;
  var pwd = document.getElementById('pwd').value;
  signup(email, pwd);
}

var handleLogin = function() {
  var email = document.getElementById('email').value;
  var pwd = document.getElementById('pwd').value;
  login(email, pwd);
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location = './home.html'
  }
});
