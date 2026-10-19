const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const port = 3000

require('dotenv').config()
require('./config/db')

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: { status: 429, error: 'Too many requests'}
})

app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: { policy: "cross-origin"}
    })
)

app.use(express.json())
app.use(cors())
app.use(limiter)

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API RESTful !')
})

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`)
})