const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const productsRouter = require('./routes/products')

const app = express()
const PORT = 5000

app.use(cors())
app.use(bodyParser.json())

// Serve images
app.use('/uploads', express.static('uploads'))

app.use('/api/products', productsRouter)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))