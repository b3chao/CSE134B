// Initialize Firebase
var config = {
    apiKey: "AIzaSyBSqnmEYkvUCT084y_NPpJeL9-TofpOsq4",
    authDomain: "cse134b-all.firebaseapp.com",
    databaseURL: "https://cse134b-all.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "295582276921"
};
firebase.initializeApp(config);

var logout = function () {
    firebase.auth().signOut().then(function () {
        window.location = './login.html';
    }, function (error) {
        // An error happened.
    });
}

$(document).ready(function () {
    $("#search_button").click(searchMeal);
})

function searchMeal(e) {
    e.preventDefault();
    console.log("searchMeal");

    $.post("https://api.edamam.com/search",
        {
            app_id: "2d286989",
            app_key: "e5d5149395fe93594da1147d9cac7e6e",
            q: "chicken"
        }, function (data, status) {
            console.log(status);
            console.log(data);



            new Vue({
                el: '#search_results',
                data: {
                    results: [
                        { text: 'Learn JavaScript' },
                        { text: 'Learn Vue' },
                        { text: 'Build something awesome' }
                    ]
                }
            })
        });
}