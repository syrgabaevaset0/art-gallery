const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./src/config/db')

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes')
const artworkRoutes = require('./src/routes/artworkRoutes')
const externalRoutes = require('./src/routes/externalRoutes')

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/artworks', artworkRoutes)
app.use('/api/external', externalRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Art Gallery API is running' })
})

const errorHandler = require('./src/middleware/errorMiddleware')
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
