const getInfo = async (database) => {
  const collection = database.collection('blog_info')
  const info = await collection.findOne({})
  return info
}
exports.getInfo = getInfo
