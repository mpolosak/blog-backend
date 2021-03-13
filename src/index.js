require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT ?? 3000

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const { BlogInfo } = require('./blog-info.js')

const main = async () => {
    const database = await require('./database.js').connect()
    
    const schema = buildSchema(`
        type BlogInfo{
            title: String
            description: String
        }
        type Query {
            info: BlogInfo 
        }
    `);
    const root = {
        info: () => {
            return new BlogInfo(database)
        }
    };

    app.use('/', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));

    app.listen(port, () => {
        console.log(`Blog backend listening at port ${port}`)
    })
}

main()