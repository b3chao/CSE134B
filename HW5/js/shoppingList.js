// Initialize Firebase
var config = {
    apiKey: "AIzaSyBSqnmEYkvUCT084y_NPpJeL9-TofpOsq4",
    authDomain: "cse134b-all.firebaseapp.com",
    databaseURL: "https://cse134b-all.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "295582276921"
};

var logout = function () {
    firebase.auth().signOut().then(function () {
        window.location = './login.html';
    }, function (error) {
        // An error happened.
    });
}

firebase.initializeApp(config);
var database = firebase.database();
var ref = database.ref();

var vm = new Vue({
    el: '#vue-app',
    data: {
      user: null,
      shopping_list: null
    },
    created: function() {
      var $this = this;
      firebase.auth().onAuthStateChanged(function (fb_user) {
          if (fb_user) {
              $this.user = fb_user;
              var cuRef = ref.child($this.user.uid);
              cuRef.once("value", function (snapshot) {
                  var cuData = snapshot.val();
                  $this.shopping_list = cuData.shopping_list;
              });
          }
      });
    },
    methods: {

    }
});
