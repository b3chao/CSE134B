// Initialize Firebase
var config = {
    apiKey: "AIzaSyBSqnmEYkvUCT084y_NPpJeL9-TofpOsq4",
    authDomain: "cse134b-all.firebaseapp.com",
    databaseURL: "https://cse134b-all.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "295582276921"
};

var logout = function() {
    firebase.auth().signOut().then(function() {
        window.location = './login.html';
    }, function(error) {
        // An error happened.
    });
}

var apiOptions = {
    app_id: "2d286989",
    app_key: "e5d5149395fe93594da1147d9cac7e6e",
    from: 0,
    to: 25
};

firebase.initializeApp(config);
var database = firebase.database();
var ref = database.ref();


var vm = new Vue({
    el: '#vue-app',
    data: {
        all_results: null,
        results: null,
        searchInput: null,
        pages: null
    },
    methods: {
        searchMeals: function() {
            apiOptions['q'] = this.searchInput;

            $.post("https://api.edamam.com/search", apiOptions, function(data, status) {
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
                        //food id
                        var index = recipe['uri'].indexOf('#') + 1;
                        result['food_id'] = recipe['uri'].slice(index);

                        results.push(result);
                    }

                    vm['pages'] = Math.ceil(results.length / 5);
                    vm['all_results'] = results;
                    vm['results'] = results.slice(0, 5);
                } else {
                    alert("No results found!");
                }
            });
        },

        addMeal: function(index, event) {
            var user = firebase.auth().currentUser;
            if (user) {
                var toAdd = this.results[index];
                var cuRef = ref.child(user.uid);
                cuRef.once("value", function(snapshot) {
                    var cuData = snapshot.val();

                    if (!cuData) {
                        cuData = {};
                        if (!cuData.favorites) {
                            cuData.favorites = [];
                        }
                    }

                    cuData.favorites.push(toAdd);

                    cuRef.set(cuData);
                    alert("Added " + toAdd['label'] + " to favorites");
                });
            }
        },

        switchPage: function(index, event) {
          console.log('switching pages');
          var to  = index * 5;
          var from = to - 5;
          vm['results'] = vm['all_results'].slice(from, to);
        }
    }
});
