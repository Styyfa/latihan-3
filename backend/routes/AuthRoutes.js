import express from 'express'
import { Me, logOut, login } from '../controllers/AuthUser.js'
import { auth } from '../middlewares/AuthMiddleware.js'

const r = express.Router()

r.post('/login', login)
r.get('/me', Me)
r.delete('/logout/:id', logOut)

export default r