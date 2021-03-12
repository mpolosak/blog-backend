require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT ?? 3000

app.get('/', (req, res) => {
    res.json({ greeting: 'Hello world' })
})

app.listen(port, () => {
    console.log(`Blog backend listening at port ${port}`)
})