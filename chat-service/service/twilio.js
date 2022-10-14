import {Client as TwilioClient} from 'twilio-chat'
import {generateToken} from './tokenService.js'


channels = new Map()

let client = new TwilioClient(generateToken("server"))

// When both users request to join chat room then server will open the channel
export async function createChannel(roomId, user1, user2) {
    client.createChannel({
        uniqueName: roomId,
        friendlyName: 'PeerPrep Chat Channel',
    }).then((channel) => {
        channel.invite(user1)
        channel.invite(user2)
        channels.set(roomId, channel)
        console.log("Channel created " + roomId)
    })
}

// When both users disconnect
export async function deleteChannel(roomId) {
    channels.delete(roomId)
}