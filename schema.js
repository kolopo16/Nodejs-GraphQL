var { GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema } = require('graphql');
var Users = require('./data/Users.json');

let UserType = new GraphQLObjectType({
    name: 'user',
    fields: function () {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLInt)
            },
            username: {
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                type: new GraphQLNonNull(GraphQLString)
            },
            url: {
                type: GraphQLString
            },
            note: {
                type: GraphQLString
            },
        }
    }
});

let queryType = new GraphQLObjectType({
    name: 'query',
    fields: function () {
        return {
            allUsers: {
                type: new GraphQLList(UserType),
                resolve: function () {
                    return Users;
                }
            },
            // userByID: {
            //     type: new GraphQLList(UserType),
            //     resolve: function (root, {id}) {
            //         return Users.findById(id, Users);
            //     }
            // }
        }
    }
});

let UserAdd = {
    type: new GraphQLList(UserType),
    description: 'Add user',
    args: {
        username: {
            name: 'Username',
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            name: 'Password',
            type: new GraphQLNonNull(GraphQLString)
        },
        url: {
            name: 'URL',
            type: GraphQLString
        },
        note: {
            name: 'Note',
            type: GraphQLString
        },
    },
    resolve: function (root, {username, password, url, note}) {
        let id = 1
        Users.push({
            id: id,
            username: username,
            password: password,
            url: url,
            note: note
        });

        return Users;
    }
}

let UserUpdate = {
    type: new GraphQLList(UserType),
    description: 'update user',
    args: {
        id: {
            name: 'ID',
            type: new GraphQLNonNull(GraphQLInt)
        },
        password: {
            name: 'Password',
            type: new GraphQLNonNull(GraphQLString)
        },
        url: {
            name: 'URL',
            type: GraphQLString
        },
        note: {
            name: 'Note',
            type: GraphQLString
        },
    },
    resolve: function (root, {id, password, url, note}) {
        let user = Users.find(q => q.id == id);
        user.password = password;
        user.url = url;
        user.note = note;

        return Users;
    }
}

let mutationType = new GraphQLObjectType({
    name: 'mutation',
    fields: function () {
        return {
            addUser: UserAdd,
            updateUser: UserUpdate
        }
    }
})

let schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

module.exports = schema;