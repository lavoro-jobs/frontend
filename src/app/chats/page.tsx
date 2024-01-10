'use client'
import { Channel as StreamChannel, StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelList, Window, ChannelHeader, MessageList, MessageInput } from 'stream-chat-react';
import getCurrentUser from "@/helpers/getCurrentUser";
import {useEffect, useState} from "react";
import 'stream-chat-react/dist/css/index.css';
import Sidenav from "@/components/features/dashboard/Sidenav";
import hashEmail from "@/helpers/hashEmail";

export default function ChatPage() {
  const [chatClient, setChatClient] = useState<StreamChat>();

  useEffect(() => {
    connectToStreamChat()
  }, []);

  const connectToStreamChat = async () => {
    let response = await getCurrentUser();
    let currentUser = response.data;
    let email = currentUser.email;
    let hashedEmail = await hashEmail(email);
    const client = new StreamChat(
      "etwdd8qaagmg",
      "sn7chvub9p2pswc8g94quxbcxc57pt5uq258ykv3e8asf64dgmcz5d9g3dy22fxx",
      {
        browser: false,
      },
    );

    await client.connectUser(
      {
        id: hashedEmail,
        name: email
      },
      currentUser.stream_chat_token
    )
    setChatClient(client);
  }

  if (!chatClient) {
    return <div>Loading chat...</div>; // Or some other loading state
  }

  return (
    <Sidenav>
      <Chat client={chatClient}>
        <ChannelList
          filters={{ members: { $in: [chatClient.user.id] } }}
          sort={{ last_message_at: -1 }}
        />
        <Channel>
          <Window>
            <ChannelHeader/>
            <MessageList/>
            <MessageInput/>
          </Window>
        </Channel>
      </Chat>
    </Sidenav>
  );
}