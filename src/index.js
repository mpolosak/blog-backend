require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT ?? 3000

const main = async () => {
    const database = await require('./database.js').connect()

    app.get('/', (req, res) => {
        res.json({ greeting: 'Hello world' })
    })

    app.listen(port, () => {
        console.log(`Blog backend listening at port ${port}`)
    })
}

main()