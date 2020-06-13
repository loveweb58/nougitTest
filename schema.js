const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLList,
    GrapphQLNonNull,
    GraphQLEnumType,
    GraphQLBoolean
} = require('graphql')
const GraphQLDate = require('graphql-date')

//author Type
const AuthType = new GraphQLObjectType({
    name: 'Auth',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        picture: {type: GraphQLString},
        title: {type: GraphQLString},
        score: {type: GraphQLFloat}
    })
})

// Entry Type
const EntryType = new GraphQLObjectType({
    name: 'Entry',
    fields: () => ({
        id: {type: GraphQLString},
        author: {type: AuthType},
        date: {type: GraphQLDate},
        popularity: {type: GraphQLInt},
        isTrending: {type: GraphQLBoolean},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        numComments: {type: GraphQLString},
        thumbnail: {type:GraphQLString},
        codeSubmissionTotal: {type: GraphQLInt},
        pledgeTotal: {type: GraphQLFloat},
        pledgeGoal: {type: GraphQLFloat},
        pledgerCount: {type: GraphQLInt},
        status: {type: new GraphQLEnumType({
            name: 'stataus',
            values: {
                CLOSED: {
                  value: 0
                },
                OPEN: {
                    value: 1
                }
            }
        })}
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllEntries: {
            type: new GraphQLList(EntryType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3004/entries`)
                    .then(res=>res.data)
            }
        },
        entries: {
            type: new GraphQLList(EntryType),
            args: {
                page: {type: GraphQLInt},
                limit: {type: GraphQLInt},
                sort: {type: GraphQLString},
                isTrending: {type: GraphQLBoolean},
                status: {type: GraphQLInt}
            },
            resolve(parentValue, args) {
                let url = `http://localhost:3004/entries?_page=${args.page}&_limit=${args.limit}&_sort=${args.sort}&_order=desc`
                if(args.status!==undefined) {
                    url+=`&status=${args.status}`
                }
                if(args.isTrending!==undefined) {
                    url+=`&isTrending=${args.isTrending}`
                }
                return axios.get(url)
                .then(res=>{
                    return res.data
                })
            }
        }
    }
    
})

module.exports = new GraphQLSchema({
    query: RootQuery
})