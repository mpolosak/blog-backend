const crypto = require('crypto')
const EVP = require('email-validator-pro')
const validator = new EVP()
const { checkPassword } = require('./password')
const jwt = require('jsonwebtoken')

const signUp = async (database, {email, password}) => {
    if(!validator.isValidAddress(email))
        throw Error('Nonvalid email')
    checkPassword(password)
    const collection = database.collection('users')
    const salt = crypto.randomBytes(32)
    const hashed_password = crypto.scryptSync(password, salt, 64)
    console.log(salt)
    const input = {
        signup_date: new Date(),
        email,
        credentials:{
            salt,
            password: hashed_password
        }
    }
    const response = await collection.insertOne(input)
    return response.insertedId
}

const signIn = async (database, {email, password}) => {
    const collection = database.collection('users')
    const {_id, credentials} = await collection.findOne({ email }, {
        projection: {
            credentials: 1
        }
    })
    if(!_id){
        throw Error('Incorrect email or password')
    }
    const hashed_password = crypto.scryptSync(password, credentials.salt.buffer, 64)
    if(hashed_password.compare(credentials.password.buffer)){
        throw Error('Incorrect email or password')
    }
    const token = jwt.sign({_id}, process.env.TOKEN_SECRET)
    return token
}

exports.signUp = signUp
exports.signIn = signIn