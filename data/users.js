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
    queryUserID: function (id) {
        return userRef.child(id).once('value').then(function(snapshot) {
            var user = snapshot.val();
            return user;
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
        userRef.child(input.id).set(inputData);
        // database().ref('users/' + input.id).set(inputData);

        return this.queryUserID(input.id);
    },
    updateUser: function (input) {
        var updateData = {
            title: input.title,
            password: input.password,
            url: input.url,
            note: input.note
        }
        userRef.child(input.id).update(updateData);
        // database().ref('users/' + input.id).update(updateData);

        return this.queryUserID(id);
    },
    deleteUser: function (id) {
        userRef.child(id).remove();
        // database().ref('users/' + id).remove();
    }
}

module.exports = users;
