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

exports.getPosts = getPosts
