import UserModel from "../models/UsersModels.js"
import argon2 from 'argon2'

export const login = async (req, res) =>{
    const user = await UserModel.findOne({email: req.body.email})
    if(!user) return res.status(500).json({msg: "user tidak ditemukan"})
    const pass = await argon2.verify(user.password, req.body.password)
    if(!pass) return res.status(500).json({msg: "password salah"})
    req.session.userId = user._id
    res.status(200).json({
        msg: "login succes",
        user: {
            name: user.username,
            email: user.email
        }
    })
}

export const Me = async (req, res) => {
    if(!req.session.userId) return res.status(500).json({msg: "Mohon Login terlebih dahulu"})
    const user = await UserModel.findById(req.session.userId)
    if(!user) return res.status(500).json({msg: "user tidak di temukan"})
    const data = {
        username: user.username,
        id: user._id,
        email: user.email
    }
    res.status(200).json(data)
}

export const logOut = async (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(500).json({msg: "tidak dapat logout"})
        res.status(200).json({msg: "telah logout"})
    })
}