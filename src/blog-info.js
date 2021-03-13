class BlogInfo {
  constructor (database) {
    const infoCollection = database.collection('blog_info')
    this.info = infoCollection.findOne({})
  }

  async title () {
    this.info = await this.info
    return this.info.title
  }

  async description () {
    this.info = await this.info
    return this.info.description
  }
}
exports.BlogInfo = BlogInfo
