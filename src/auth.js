const signUp = async (database, credentials) => {
    const collection = database.collection('users')
    const input = {
        signup_date: new Date(),
        credentials
    }
    const response = await collection.insertOne(input)
    return response.insertedId
}

exports.signUp = signUp