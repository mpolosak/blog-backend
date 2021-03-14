const ObjectID = require('mongodb').ObjectID

const getPosts = async (database, params) => {
  const collection = database.collection('posts')
  const latest = params.latest
  delete params.latest
  const posts = await collection.find(params).sort({ date: -1 }).limit(latest ?? 0).toArray()
  posts.forEach(element => {
    element.date = element.date.toJSON()
  })
  return posts
}

const addPost = async (database, input) => {
  const collection = database.collection('posts')
  input.date = new Date()
  const result = await collection.insertOne(input)
  const output = { _id: result.insertedId, ...input }
  output.date = output.date.toJSON()
  return output
}

const modifyPost = async (database, input) => {
  const collection = database.collection('posts')
  const _id = input._id
  delete input._id
  const response = await collection.findOneAndUpdate({"_id":ObjectID(_id)}, {$set:input}, {returnOriginal: false})
  console.log(response)
  return response.value
}

exports.getPosts = getPosts
exports.addPost = addPost
exports.modifyPost = modifyPost
