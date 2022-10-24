import 'dotenv/config'

export async function handleGetKeys(req, res) {
    res.send({
        publish_key: process.env.PUBNUB_PUBLISH_KEY,
        subscribe_key: process.env.PUBNUB_SUBSCRIBE_KEY
    })
}