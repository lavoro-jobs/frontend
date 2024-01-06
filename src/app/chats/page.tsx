'use client'
import { Channel as StreamChannel, StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelList, Window, ChannelHeader, MessageList, MessageInput } from 'stream-chat-react';
import getCurrentUser from "@/helpers/getCurrentUser";
import {useEffect, useState} from "react";
import 'stream-chat-react/dist/css/index.css';

export default function ChatPage() {
  const [chatClient, setChatClient] = useState<StreamChat>();
  const [currentChannel, setCurrentChannel] = useState<StreamChannel | null>(null);

  useEffect(() => {
    connectToStreamChat()
  }, []);

  const connectToStreamChat = async () => {
    let response = await getCurrentUser();
    let currentUser = response.data;
    let email = currentUser.email;
    let hashedEmail = await hashEmail(email);

    const client = new StreamChat(process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY);

    await client.connectUser(
      {
        id: hashedEmail,
        name: email
      },
      currentUser.stream_chat_token
    )
    const channels = await client.queryChannels({});
    const defaultChannel = channels[0];

    setCurrentChannel(defaultChannel);
    setChatClient(client);
  }

  async function hashEmail(email: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(email);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
  }

  if (!chatClient) {
    return <div>Loading chat...</div>; // Or some other loading state
  }

  return (
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
  );
}