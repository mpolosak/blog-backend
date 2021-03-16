require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT ?? 3000

const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const { getInfo } = require('./blog-info.js')
const { getPosts, addPost, modifyPost } = require('./posts.js')
const { getUser, searchUsers } = require('./users.js')

const main = async () => {
  const database = await require('./database.js').connect()

  const schema = buildSchema(`
        type BlogInfo{
            title: String
            description: String
        }
        type  Post{
            _id: ID
            title: String
            content: String
            date: String
        }
        type User{
            _id: ID
            name: String
            description: String
            signup_date: String
        }
        type Query {
            info: BlogInfo
            getPosts(latest: Int, title: String): [Post]
            getUser(_id: ID!): User
            searchUsers(name: String): [User]
        }
        type Mutation {
            addPost(title: String, content: String): Post
            modifyPost(_id: ID!, title: String, content: String): Post
        }
    `)
  const root = {
    info: () => {
      return getInfo(database)
    },
    getPosts: (params) => {
      return getPosts(database, params)
    },
    addPost: (input) => {
      return addPost(database, input)
    },
    modifyPost: (input) => {
      return modifyPost(database, input)
    },
    getUser: (params) => {
      return getUser(database, params)
    },
    searchUsers: (params) => {
      return searchUsers(database, params)
    }
  }

  app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  }))

  app.listen(port, () => {
    console.log(`Blog backend listening at port ${port}`)
  })
}

main()
