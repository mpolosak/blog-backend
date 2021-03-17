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

exports.getUser = getUser
exports.searchUsers = searchUsers
