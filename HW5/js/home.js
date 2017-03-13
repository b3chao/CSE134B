// Initialize Firebase
var config = {
    apiKey: "AIzaSyBSqnmEYkvUCT084y_NPpJeL9-TofpOsq4",
    authDomain: "cse134b-all.firebaseapp.com",
    databaseURL: "https://cse134b-all.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "295582276921"
};

firebase.initializeApp(config);
var database = firebase.database();
var ref = database.ref();

var logout = function () {
    firebase.auth().signOut().then(function () {
        window.location = './login.html';
    }, function (error) {
        // An error happened.
    });
}

var vm = new Vue({
    el: '#favorite_list',
    data: {
      favorites: null,
      user: null
    },
    created: function() {
      var $this = this;
      firebase.auth().onAuthStateChanged(function (fb_user) {
          if (fb_user) {
              $this.user = fb_user;
              var cuRef = ref.child($this.user.uid);
              cuRef.once("value", function (snapshot) {
                  var cuData = snapshot.val();
                  $this.favorites = cuData.favorites;
              });
          }
      });
    },
    methods: {
        //remove meal from favorites list
        removeMeal: function (index, event) {
            var cuRef = ref.child(this.user.uid);
            var $this = this;
            cuRef.once("value", function (snapshot) {
                var cuData = snapshot.val();
                cuData.favorites.splice(index, 1);
                cuRef.set(cuData);
                $this.favorites = cuData.favorites;
            });
        },
        //rank up meal in favorites list
        rankUp: function (index, event) {
            if (index != 0) {
                var cuRef = ref.child(this.user.uid);
                var $this = this;
                cuRef.once("value", function(snapshot) {
                    var cuData = snapshot.val();
                    var temp = cuData.favorites[index - 1];
                    cuData.favorites[index - 1] = cuData.favorites[index];
                    cuData.favorites[index] = temp;
                    cuRef.set(cuData);
                    $this.favorites = cuData.favorites;
                });
            }
        },
        addIngredients: function(index) {
          var cuRef = ref.child(this.user.uid);
          var $this = this;
          cuRef.once("value", function(snapshot) {
              var cuData = snapshot.val();
              var meal = cuData.favorites[index];
              var ingredients = meal.ingredient_array;
              if (!cuData.shopping_list) {
                cuData.shopping_list = [];
              }
              cuData.shopping_list = cuData.shopping_list.concat(ingredients);
              cuRef.set(cuData);
          });
        }
    }
});
