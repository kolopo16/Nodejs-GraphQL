var { database } = require('./firebase');

var userRef = database().ref('users');

var users = {
    queryUser: function () {
        return userRef.once('value').then(function(snapshot) {
            var users = (snapshot.val() || []);
            
            var allusers = Object.keys(users).map(function (v,i){
                return users[v];
            });

            console.log(allusers);
            return allusers;
        })
    },
    addNewUser: function (input) {
        var inputData = {
            id: input.id,
            title: input.title,
            username: input.username,
            password: input.password,
            url: input.url,
            note: input.note
        }
        database().ref('users/' + input.id).set(inputData);
    },
    updateUser: function (input) {
        var updateData = {
            title: input.title,
            password: input.password,
            url: input.url,
            note: input.note
        }
        database().ref('users/' + input.id).update(updateData);
    },
    deleteUser: function (id) {
        database().ref('users/' + id).remove();
    }
}

module.exports = users;
