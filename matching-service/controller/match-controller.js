import uniqid from 'uniqid'
import delay from 'delay'
import { ormCreateMatch, ormFindMatch, ormDeleteMatch } from "../model/match-orm.js";
import { ormCreatePendingMatch, ormFindPendingMatch, ormDeletePendingMatch } from '../model/pending-match-orm.js';
import { ormCreateUpdateUser, ormFindUser, ormDeleteUser } from '../model/user-orm.js';

export async function createMatch(socket, userId, difficulty) {
    let pendingMatch = await ormFindPendingMatch(userId, null)
    if (pendingMatch) {
        // User is already searching for match (Probably using multiple tabs open)
        return [null, false]
    }

    const existingMatch = await ormFindMatch(userId)
    if (existingMatch) {
        // User is already matched
        return [null, false]
    }

    // Update socket ID to user pairing
    await ormCreateUpdateUser(socket.id, userId)

    // Find any pending matches of matching difficulty
    pendingMatch = await ormFindPendingMatch(null, difficulty)

    if (pendingMatch == null) {
        // If there are no matches, user joins an empty room and create a pendingMatch
        const roomId = uniqid()
        socket.join(roomId)
        await ormCreatePendingMatch(userId, roomId, difficulty)
        return [roomId, false]
    } else {
        // If a match is found, user joins the room with waiting user and the pendingMatch is removed
        socket.join(pendingMatch.roomId)
        ormCreateMatch(userId, pendingMatch.user, pendingMatch.roomId)
        ormDeletePendingMatch(pendingMatch.user)
        return [pendingMatch.roomId, true]
    }   
}

// Delete 1.Socket-User pair and 2.Pending Match 
export async function foundMatchWithin30s(socketId, userId) {
    await delay(30000)
    await ormDeleteUser(socketId)
    const pendingMatch = await ormFindPendingMatch(userId, null)
    if (pendingMatch) {
        await ormDeletePendingMatch(userId)
        return false
    }
    return true
}

// Delete 1.User and 2.Match or existing Pending Match
export async function leaveRoom(socketId, userId) {
    await ormDeleteUser(socketId)
    await ormDeleteMatch(userId)
    await ormDeletePendingMatch(userId)
}

// Delete 1.Socket-User pair, 2.Match/Pending Match
export async function disconnect(socketId) {
    const user = await ormFindUser(socketId)
    if (user == null) {
        return null
    }

    const userId = user.userId
    await ormDeleteUser(socketId)

    const pendingMatch = await ormFindPendingMatch(userId, null)
    if (pendingMatch) {
        await ormDeletePendingMatch(userId)
        return pendingMatch.roomId
    }

    const match = await ormFindMatch(userId)
    if (match) {
        await ormDeleteMatch(userId)
        return match.roomId
    }
    return null
}