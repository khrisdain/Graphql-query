const { projects, clients} = require('../sampleData.js');

//mongoose models
const project = require('../models/project');
const client = require('../models/project');

//GraphQL deprecated objects 
const { GraphQLObjectType,
        GraphQLSchema,
        GraphQLID,
        GraphQLString,
        GraphQLList
     } = require('graphql');


//Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({ //data from sampleData
        id: { type: GraphQLString },
        name: { type: GraphQLString},
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args){
                return client.findById(parent.clientId)
            },
        },
    }),
});

//Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({ //data from sampleData
        id: { type: GraphQLString },
        name: { type: GraphQLString},
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType', 
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            //args not required for the list 
            resolve(parent, args){ 
                return project.find(); 
            }
        },

        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return project.findById(args.id); //objects.find()
            },
        },

        clients: {
            type: new GraphQLList(ClientType),
            //args not required for the list 
            resolve(parent, args){ 
                return client.find(); 
            }
        },

        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return client.findById(args.id); //objects.find()
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
})