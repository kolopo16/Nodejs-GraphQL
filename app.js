var express = require('express');
var users = require('./data/users');

let app = express();
let PORT = 8080;

app.get('/api/user/allUsers', function (req, res) {
    users.queryUser().then(function (users) { 
        if(!users) {return res.status(404).send("No user found.")};
        res.status(200).send(users);
    });
});

app.get('/api/user/:id', function (req, res) {
    let User = users.queryUserID(req.params.id).then(function (user) {
        if(!user) {return res.status(404).send("No user id: " + req.params.id + " found.")};
        res.status(200).send(user);
    });
    
});

app.post('/api/user/add', function (req, res) {
    let User = users.addNewUser({
        id: guid(),
        title: req.query.title,
        username: req.query.username,
        password: req.query.password,
        url: req.query.url,
        note: req.query.note
    }).then(function (user) {
        if(!user) {return res.status(404).send("Cannot add new user.")};
        res.status(200).send(user);
    });
});

app.post('/api/user/update/:id', function (req, res) {
    let User = users.updateUser({
        id: req.params.id,
        title: req.query.title,
        password: req.query.password,
        url: req.query.url,
        note: req.query.note
    }).then(function (user) {
        if(!user) {return res.status(404).send("No user id: " + req.params.id + " found.")};
        res.status(200).send(user);
    });
});

app.delete('/api/user/:id', function (req, res) {
    let User = users.deleteUser(req.params.id);
    res.status(200).send('Delete complete!');
});

let guid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
    
let server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('GraphQL listening at http://%s:%s', host, port);
})