import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    username: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
}, {timestamps: true}
)

const UserModel = mongoose.model('User', UserSchema)

export default UserModel;