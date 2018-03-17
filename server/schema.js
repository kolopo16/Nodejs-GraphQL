var { GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema } = require('graphql');
var Users = require('./data/users.json');

let UserType = new GraphQLObjectType({
    name: 'user',
    fields: function () {
        return {
            id: {
                type: GraphQLInt
            },
            username: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
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
    resolve: function (root, {input}) {
        Users.push({
            id: 1,
            username: input.username,
            password: input.password,
            url: input.url,
            note: input.note
        });

        return Users;
    }
}

let mutationType = new GraphQLObjectType({
    name: 'mutation',
    fields: function () {
        return {
            addUser: UserAdd
        }
    }
})

let schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

module.exports = schema;