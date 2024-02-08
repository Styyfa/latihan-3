import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import db from './config/db.js'
import UserRoutes from './routes/UserRoutes.js'
import AuthRoutes from './routes/AuthRoutes.js'
import session from 'express-session'

dotenv.config()

const app = express()

app.use(express.json())
app.use(session({
    name: 'test',
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: 'auto',
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

// CONNECT DATABASE
db()

// CONNECT ROUTES
app.use('/', UserRoutes)
app.use('/', AuthRoutes)

app.listen(process.env.PORT, () => {
    console.log('server telah berjalan')
})