require('dotenv').config()

const path = require('path')
const express = require('express')
const app = express()

const pathToDist = path.resolve(__dirname, '../client/dist/miniGameStore')

app.use(express.static(pathToDist))

app.get('/api/test', (req,res) => {
  res.send({message: 'Success!'})
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/miniGameStore/index.html'))
})

app.listen(process.env.PORT || 8080)

