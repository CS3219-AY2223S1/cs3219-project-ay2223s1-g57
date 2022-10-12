import mongoose from 'mongoose'

var Schema = mongoose.Schema

let UserModelSchema = new Schema({
    socketId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    }
})

export default mongoose.model('UserModel', UserModelSchema)