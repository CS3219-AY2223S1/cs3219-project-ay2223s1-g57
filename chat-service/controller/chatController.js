import {createChannel, deleteChannel} from '../service/twilio.js'

pendingChannels = new Map();

export async function joinChatRoom(req, res) {
    roomId = req.body.roomid
    user = req.body.user

    if (pendingChannels.has(roomId)) {
        otherUser = pendingChannels.get(roomId)
        pendingChannels.delete(roomId)
        await createChannel(roomId, user, otherUser)
    } else {
        pendingChannels.set(roomId, user)
    }
    res.status(200).send()
}