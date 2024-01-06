"use client";
import { StreamChat } from 'stream-chat';
import getCurrentUser from "@/helpers/getCurrentUser";
import hashEmail from "@/helpers/hashEmail";


const createPrivateChat = async (applicantEmail: any) => {

  const client = new StreamChat(process.env.NEXT_PUBLIC_STREAM_API_KEY);

  // Get the current user
  const response = await getCurrentUser();
  const currentUser = response.data;

  const email = currentUser.email;
  const hashedEmail = await hashEmail(email);
  const hashedApplicantEmail = await hashEmail(applicantEmail);

  await client.connectUser(
    {
      id: hashedEmail,
      name: 'Jim Lahey',
      image: 'https://i.imgur.com/fR9Jz14.png',
    },
    currentUser.stream_chat_token,
  )

  const hashedEmailHalf = hashedEmail.substring(0, 20);
  const hashedApplicantEmailHalf = hashedApplicantEmail.substring(0, 20);
  const channelId = `${hashedEmailHalf}-${hashedApplicantEmailHalf}`;
  const channel = client.channel('messaging',
    channelId,
    {
    members: [hashedEmail, hashedApplicantEmail],
    name: `${hashedEmail}-${hashedApplicantEmail}`,
  });

  await channel.watch();

  const text = 'I’m mowing the air Randy, I’m mowing the air.';

  const responseFromChannel = await channel.sendMessage({
    text,
    customField: '123',
  });

  console.log(responseFromChannel)

  return channel;
}

export default createPrivateChat;

