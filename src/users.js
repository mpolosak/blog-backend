const { ObjectID } = require('mongodb')

const getUser = async (database, { _id }) => {
  const collection = database.collection('users')
  const user = await collection.findOne({ _id: ObjectID(_id) })
  return user
}
const searchUsers = async (database, { name }) => {
  const collection = database.collection('users')
  const users = await collection.find({ name: { $regex: name, $options: 'i' } }).toArray()
  return users
}

const modifyUser = async (database, { _id, ...input }, { user }) => {
  if(!user){
    throw Error('You don`t have permisions to modify this user')
  }
  if(!_id){
    // if _id isn't setted assume that user want to modify their own data 
    _id = user._id
  }
  if(_id!=user._id)
  {
    // in future check if user has administration privilages
    // for now we throw an error where requesting user isn't
    // modifying user
    throw Error('You don`t have permisions to modify this user')
  }
  const collection = database.collection('users')
  const response = await collection.findOneAndUpdate(
    { _id: ObjectID(_id) },
    { $set: input },
    { returnOriginal: false }
  )
  return response.value
}

exports.getUser = getUser
exports.searchUsers = searchUsers
exports.modifyUser = modifyUser
