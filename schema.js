var { GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema } = require('graphql');
var Users = require('./data/users');

let UserType = new GraphQLObjectType({
    name: 'user',
    fields: function () {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLString)
            },
            title: {
                type: new GraphQLNonNull(GraphQLString)
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
                    return Users.queryUser();
                }
            },
            userByID: {
                type: new GraphQLList(UserType),
                args: {
                    id: {
                        name: "ID",
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, {id}) {
                    return Users.queryUser().then((users) => users.filter(user => user.id == id));
                }
            }
        }
    }
});

let UserAdd = {
    type: new GraphQLList(UserType),
    description: 'Add user',
    args: {
        title: {
            name: 'Title',
            type: new GraphQLNonNull(GraphQLString)
        },
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
    resolve: function (root, input) {
        input.id = guid();
        Users.addNewUser(input);

        return Users.queryUser().then((users) => users.filter(user => user.id == input.id));
    }
}

let UserUpdate = {
    type: new GraphQLList(UserType),
    description: 'update user',
    args: {
        id: {
            name: 'ID',
            type: new GraphQLNonNull(GraphQLString)
        },
        title: {
            name: 'Title',
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
    resolve: function (root, input) {
        Users.updateUser(input);

        return Users.queryUser().then((users) => users.filter(user => user.id == input.id));
    }
}

let UserDelete = {
    type: new GraphQLList(UserType),
    description: 'update user',
    args: {
        id: {
            name: 'ID',
            type: new GraphQLNonNull(GraphQLString)
        },
    },
    resolve: function (root, {id}) {
        Users.deleteUser(id);

        return [];
    }
}

let mutationType = new GraphQLObjectType({
    name: 'mutation',
    fields: function () {
        return {
            addUser: UserAdd,
            updateUser: UserUpdate,
            deleteUser: UserDelete,
        }
    }
})

let schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

let guid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

module.exports = schema;