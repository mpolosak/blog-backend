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

exports.getPosts = getPosts
exports.addPost = addPost
