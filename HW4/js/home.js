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

$(document).ready(function () {
    initializePage();
})

function initializePage(e) {
    //get current user ref
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var cuRef = ref.child(user.uid);
            cuRef.once("value", function (snapshot) {
                var cuData = snapshot.val();
                var vueData = {};
                vueData['results'] = cuData;
                if (cuData) {
                    new Vue({
                        el: '#favorite_list',
                        data: vueData,
                        methods: {
                            //remove meal from favorites list
                            removeMeal: function (index, event) {
                                var toRemoveRef = ref.child(user.uid + "/" + index);
                                toRemoveRef.remove();
                                location.reload();
                            },
                            //rank up meal in favorites list
                            rankUp: function (index, event) {
                                if (index != 0) {
                                    var cuRef = ref.child(user.uid);
                                    cuRef.once("value", function(snapshot) {
                                        var cuData = snapshot.val();
                                        var temp = cuData[index - 1];
                                        cuData[index - 1] = cuData[index];
                                        cuData[index] = temp;
                                        cuRef.set(cuData);

                                        location.reload();
                                    });
                                }
                            }
                        }
                    });
                }
            });
        } else {
            window.location = './login.html';
        }
    });
}