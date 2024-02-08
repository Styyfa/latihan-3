import { createUser, deleteUser, getAllUser, getOneUser, updateUser } from '../controllers/UserControllers.js'
import express from "express";
import { auth } from '../middlewares/AuthMiddleware.js';

const r = express.Router()

r.get('/user', auth, getAllUser)
r.get('/user/:id', auth, getOneUser)
r.post('/register', createUser)
r.put('/user/:id', auth, updateUser)
r.delete('/user/:id', auth, deleteUser)

export default r;