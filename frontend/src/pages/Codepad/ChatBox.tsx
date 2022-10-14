import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";

interface PropData {
    username: string,
    roomId: string,
}

type KeyResponse = {
    publish_key: string,
    subscribe_key: string
}

const ChatBox = ({username, roomId}:PropData) => {
    const [pubnubClient, setPubnubClient] = useState<PubNub>()

    useEffect(() => {
        axios.post<KeyResponse>("http://localhost:8003/keys").then((response) => {
            if (response.status == 200) {
                const publish_key = response.data.publish_key
                const subscribe_key = response.data.subscribe_key
                const pubnub = new PubNub({
                    publishKey: publish_key,
                    subscribeKey: subscribe_key,
                    userId: username
                })
                setPubnubClient(pubnub)
            }
        })
    }, [])

    return (
        <div>
            {pubnubClient? (
                <PubNubProvider client={pubnubClient}>
                    <Chat {...{ currentChannel: roomId, theme: "light" }}>
                        {/* Chat is an obligatory state provider. It allows you to configure some common component
                        options, like the current channel and the general theme for the app. */}
                        <MessageList />
                        <MessageInput />
                    </Chat>
                </PubNubProvider>

            ) : (
                <p></p>
            )};
        </div>
    )
}