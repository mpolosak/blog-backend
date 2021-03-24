const crypto = require('crypto')
const EVP = require('email-validator-pro')
const validator = new EVP()
const { checkPassword } = require('./password')

const signUp = async (database, {email, password}) => {
    if(!validator.isValidAddress(email))
        throw Error('Nonvalid email')
    checkPassword(password)
    const collection = database.collection('users')
    const salt = crypto.randomBytes(32)
    const hashed_password = crypto.scryptSync(password, salt, 64)
    const input = {
        signup_date: new Date(),
        credentials:{
            email,
            salt,
            password: hashed_password
        }
    }
    const response = await collection.insertOne(input)
    return response.insertedId
}

exports.signUp = signUp