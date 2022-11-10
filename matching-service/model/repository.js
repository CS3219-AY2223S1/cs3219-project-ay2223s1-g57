import MatchModel from './match-model.js'
import PendingMatchModel from './pending-match-model.js';
import UserModel from './user-model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createMatch(params) {
    return new MatchModel(params)
}

export async function findMatch(user) {
    return MatchModel.findOne({ $or: [{user1: user}, {user2: user}]})
}

export async function deleteMatch(user) {
    return MatchModel.deleteOne({ $or: [{user1: user}, {user2: user}]})
}

export async function createPendingMatch(params) {
    return new PendingMatchModel(params)
}

export async function findPendingMatch(user, difficulty) {
    if (user) {
        return PendingMatchModel.findOne({user: user})
    } else {
        return PendingMatchModel.findOne({difficulty: difficulty}).sort({"created_at": 1})
    }
}

export async function deletePendingMatch(user) {
    return PendingMatchModel.deleteOne({user: user})
}

export async function createUser(params) {
    return new UserModel(params)
}

export async function updateUser(socketId, userId) {
    return UserModel.updateOne({socketId: socketId}, {userId: userId})
}

export async function findUser(socketId) {
    return UserModel.findOne({socketId: socketId})
}

export async function deleteUser(socketId) {
    return UserModel.deleteOne({socketId: socketId})
}