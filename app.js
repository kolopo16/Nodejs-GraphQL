var express = require('express');
var graphqlHTTP = require('express-graphql');
var schema = require('./schema');
var graphql = require('graphql').graphql;
// var bodyParser = require('body-parser');

let app = express();
let PORT = 3000;

// app.use(bodyParser.text({ type: 'application/graphql' }));

// app.get('/api', function (req, res) {
//     graphql(schema, req.body).then(function (result) {
//         res.send(JSON.stringify(result));
//     });
// });

app.use('/api', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))

let server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('GraphQL listening at http://%s:%s', host, port);
})