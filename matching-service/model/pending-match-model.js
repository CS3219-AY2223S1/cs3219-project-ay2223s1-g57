import mongoose from 'mongoose'

var Schema = mongoose.Schema

let PendingMatchModelSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true,
    },
    roomId: {
        type: String,
        required: true,
        unique: true,
    },
    difficulty: {
        type: String,
        required: true,
    }
})

export default mongoose.model('PendingMatchModel', PendingMatchModelSchema)