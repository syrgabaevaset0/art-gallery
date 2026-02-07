const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./src/config/db')
const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes')
const artworkRoutes = require('./src/routes/artworkRoutes')
const externalRoutes = require('./src/routes/externalRoutes')
const { swaggerUi, specs } = require('./src/config/swagger')
const errorHandler = require('./src/middleware/errorMiddleware')

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Art Gallery API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/artworks', artworkRoutes)
app.use('/api/external', externalRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
