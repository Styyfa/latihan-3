import UserModel from "../models/UsersModels.js"
import argon2 from 'argon2'

export const getAllUser = async (req, res) => {
    try {
        const data = await UserModel.find()
        if(!data) return res.status(404).json({msg: 'data tidak ditemukan'})
        res.status(200).json(data)
    } catch(err) {
        res.status(500).json({msg: err})
    }
}

export const getOneUser = async (req, res) => {
    try {
        const data = await UserModel.findById(req.params.id)
        if(!data) return res.status(500).json({msg: 'data tidak ditemukan'})
        res.status(200).json(data)
    } catch(err) {
        res.status(500).json({msg: err})
    }
}

export const createUser = async (req, res) => {
    try {
        const {username, password, confPassword, email} = req.body
        if(password <= 5) return res.status(500).json({msg: "password harus lebih dari 5 kata"})
        if(password !== confPassword) return res.status(500).json({msg: 'password dan confPassword tidak sama'})
        const hashPassword = await argon2.hash(password)
        await UserModel.create({username, password: hashPassword, email})
        res.status(200).json({msg: "user telah dibuat"})
    } catch(err) {
        res.status(500).json({msg: err})
    }
}

export const updateUser = async (req, res) => {
    const user = await UserModel.findById(req.params.id)
    if(!user) return res.status(500).json({msg: 'data tidak ditemukan'})
    try {
        const {username} = req.body
        // if(password.length <= 5) return res.status(500).json({msg: "password harus lebih dari 5 kata"})
        // let newPass;
        // if(password === '' || password === null)  {
        //     newPass = user.password
        // } else {
        //     newPass = password
        // }
        // const hashPassword = await argon2.hash(newPass)
        await UserModel.findByIdAndUpdate(req.params.id, {username})
        res.status(200).json({msg: "user telah di update"})
    } catch(err) {
        res.status(500).json({msg: err})
    }
}

export const deleteUser = async (req, res) => {
    const user = await UserModel.findById(req.params.id)
    if(!user) return res.status(500).json({msg: "User tidak di temukan"})
    try {
        await UserModel.findByIdAndDelete(user._id)
        req.session.destroy(err => {
            if(err) return res.status(500).json({msg: 'Gagal Mneghapus Account'})
            res.status(200).json({msg: 'User telah dihapus'})
        })
    } catch(err) {
        res.status(500).json({msg: err})
    }
}