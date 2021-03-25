const ObjectID = require('mongodb').ObjectID

const getPost = async (database, { _id }) => {
  const collection = database.collection('posts')
  const post = await collection.findOne({ _id: ObjectID(_id) })
  post.date = post.date.toJSON()
  return post
}

const searchPosts = async (database, { text, limit = 0, skip = 0 }) => {
  const collection = database.collection('posts')
  const query = text ? { $text: { $search: text } } : {}
  const posts = await collection.find(query).limit(limit).skip(skip).toArray()
  posts.forEach(element => {
    element.date = element.date.toJSON()
  })
  return posts
}

const addPost = async (database, input, { user }) => {
  if(!user){
    throw Error('You must sign in to add post')
  }
  const collection = database.collection('posts')
  input.date = new Date()
  input.author = user._id
  const result = await collection.insertOne(input)
  const output = { _id: result.insertedId, ...input }
  output.date = output.date.toJSON()
  return output
}

const modifyPost = async (database, input, { user }) => {
  if( !user ){
    throw Error('You don`t have permisions to modify this post')
  }
  const collection = database.collection('posts')
  const { _id, author } = await collection.findOne({  _id: ObjectID(input._id) }, {
    projection: {
      author: 1
    }
  })
  delete input._id
  if(!_id){
    throw Error('Post with this id doesn`t exist')
  }
  if(author != user._id){
    throw Error('You don`t have permisions to modify this post')
  }
  const response = await collection.findOneAndUpdate(
    { _id: ObjectID(_id) },
    { $set: input },
    { returnOriginal: false }
  )
  return response.value
}

exports.getPost = getPost
exports.searchPosts = searchPosts
exports.addPost = addPost
exports.modifyPost = modifyPost
