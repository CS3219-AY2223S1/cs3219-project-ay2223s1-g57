import React, { useEffect, useState } from 'react';
import {Client as TwilioClient} from 'twilio-chat';
import axios from 'axios';
import twilio from 'twilio';

interface PropData {
    username: string;
    partnerName: string;
    roomId: string;
}

const ChatBar = ({username, partnerName, roomId}:PropData) => {
    const [twilioClient, setTwilioClient] = useState<TwilioClient>()
    const [channel, setChannel] = useState()

    useEffect(() => {
        axios.post("http://localhost:8003/token", {
            username: username
        }).then((response) => {
            if (response.status != 200) {
                console.log("Error getting twilio token")
            } else {
                let client = new TwilioClient(response.data.token)

                client.on('channelInvited', function(channel) {
                    console.log('Invited to channel ' + channel.friendlyName);
                    // Join the channel that you were invited to
                    channel.join();
                })
            }
        })
    }, []);
    
    return (
        <div> 
            <h3>chat service</h3>
        </div>
    )
}