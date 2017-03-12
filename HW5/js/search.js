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

var apiOptions = {
    app_id: "2d286989",
    app_key: "e5d5149395fe93594da1147d9cac7e6e",
    from: 0,
    to: 5
};

firebase.initializeApp(config);
var database = firebase.database();
var ref = database.ref();


var vm = new Vue({
    el: '#vue-app',
    data: {
      results: null,
      searchInput: null
    },
    methods: {
        searchMeals: function() {
          apiOptions['q'] = this.searchInput;

          $.post("https://api.edamam.com/search", apiOptions, function (data, status) {
              if (data.hits.length != 0) {
                  var results = [];
                  for (var i in data.hits) {
                      var result = {};
                      var recipe = data.hits[i]['recipe'];
                      result['label'] = recipe['label'];
                      result['img'] = recipe['image'];
                      result['calories'] = parseInt(recipe['calories']);
                      result['ingredients'] = recipe['ingredientLines'].join(', ');
                      result['ingredient_array'] = recipe['ingredientLines'];
                      result['url'] = recipe['url'];
                      result['modal_target'] = "#modal_" + i;
                      result['modal_id'] = "modal_" + i;
                      results.push(result);
                  }

                  vm['results'] = results;
              } else {
                  alert("No results found!");
              }
          });
        },

        addMeal: function (index, event) {
            var user = firebase.auth().currentUser;
            if (user) {
                var toAdd = this.results[index];
                var cuRef = ref.child(user.uid);
                cuRef.once("value", function (snapshot) {
                    var cuData = snapshot.val();

                    if (cuData) {
                        cuData.push(toAdd);
                    } else {
                        cuData = [];
                        cuData.push(toAdd);
                    }

                    cuRef.set(cuData);
                    alert("Added " + toAdd['label'] + " to favorites");
                });
            }
        }
    }
});
