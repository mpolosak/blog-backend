const mongoClient = require('mongodb').MongoClient
const mongoUrl = process.env.MONGO_URL
const dbName = process.env.DB_NAME

let connect = async () => {
    try{
        const client = await mongoClient.connect(mongoUrl)
        const database = client.db(dbName)
        return database;
    }
    catch(_){
        console.log("Cannot connect to MongoDB. Is MONGO_URL correct?")
        process.exit(1)
    }
}

exports.connect = connect