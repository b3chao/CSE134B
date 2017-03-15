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
    el: '#vue-app',
    data: {
      favorites: null,
      user: null,
      message: null
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
              var ingredient_array = meal.ingredient_array;
              var ingredients = meal.ingredients;

              if (!cuData.shopping_list) {
                cuData.shopping_list = [];
              }

              var food_id = meal.food_id;
              if (!cuData.shopping_list[food_id]) {
                cuData.shopping_list[food_id] = {};
                cuData.shopping_list[food_id].ingredient_array = ingredient_array;
                cuData.shopping_list[food_id].ingredients = ingredients;
                cuData.shopping_list[food_id].count = 1;
              } else {
                cuData.shopping_list[food_id].count += 1;
              }

              cuRef.set(cuData);
          });

          alert("Added to shopping list!");
        }
    }
});
