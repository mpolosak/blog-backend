const ObjectID = require('mongodb').ObjectID

const getPost = async (database, {_id}) => {
  const collection = database.collection('posts')
  let post = await collection.findOne({"_id":ObjectID(_id)})
  post.date = post.date.toJSON()
  return post
}

const searchPosts = async (database, {text, limit=0, skip=0}) => {
  const collection = database.collection('posts')
  const query = text ? {"$text":{"$search": text}} : {}
  let posts = await collection.find(query).limit(limit).skip(skip).toArray()
  posts.forEach(element => {
    element.date = element.date.toJSON()    
  });
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

exports.getPost = getPost
exports.searchPosts = searchPosts
exports.addPost = addPost
exports.modifyPost = modifyPost
