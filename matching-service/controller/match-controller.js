import uniqid from 'uniqid'
import { ormCreateMatch as _createMatch, ormFindMatch as _findMatch, ormDeleteMatch as _deleteMatch } from "../model/match-orm.js";
import { ormCreatePendingMatch as _createPendingMatch, ormFindPendingMatch as _findPendingMatch, ormDeletePendingMatch as _deletePendingMatch } from '../model/pending-match-orm.js';

export async function createMatch(socket, difficulty) {
    const pendingMatch = await _findPendingMatch(null, difficulty)

    if (pendingMatch == null) {
        const roomId = uniqid()
        socket.join(roomId)
        await _createPendingMatch(socket.id, roomId, difficulty)
        return [roomId, false]
    } else if (pendingMatch.user == socket.id) {
        return [pendingMatch.roomId, false]
    } else {
        socket.join(pendingMatch.roomId)
        _createMatch(socket.id, pendingMatch.user, pendingMatch.roomId)
        _deletePendingMatch(pendingMatch.user)
        return [pendingMatch.roomId, true]
    }   
}

export async function leaveRoom(socketId) {
    await _deleteMatch(socketId)
    await _deletePendingMatch(socketId)
}

export async function disconnect(socketId) {
    const pendingMatch = await _findPendingMatch(socketId, null)
    if (pendingMatch) {
        await _deletePendingMatch(socketId)
        return pendingMatch.roomId
    }

    const match = await _findMatch(socketId)
    if (match) {
        await _deleteMatch(socketId)
        return match.roomId
    }
    return null
}