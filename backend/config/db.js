import mongoose from 'mongoose'

export default function db() {
    mongoose.connect(process.env.DB_URL)
    .then(()=>console.log('berhasil connect database'))
    .catch((e)=>console.log(e))
}