"use client";
import { StreamChat } from "stream-chat";
import getCurrentUser from "@/helpers/getCurrentUser";
import hashEmail from "@/helpers/hashEmail";
import getRecruiterProfile from "@/helpers/getRecruiterProfile";

const parseJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1]; // Get the payload part of the token
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Normalize base64 string
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to parse JWT:", e);
    return null;
  }
};

const createPrivateChat = async (applicantStreamChatToken: any, first_name: string, last_name: string) => {
  const client = new StreamChat("etwdd8qaagmg");

  // Get the current user
  const response = await getCurrentUser();
  const currentUser = response.data;

  const email = currentUser.email;
  const hashedEmail = await hashEmail(email);
  const tokenPayload = parseJwt(applicantStreamChatToken);
  const hashedApplicantEmail = applicantStreamChatToken ? tokenPayload.user_id : null;

  const profile = await getRecruiterProfile();

  await client.connectUser(
    {
      id: hashedEmail,
      name: `${profile.first_name} ${profile.last_name}`,
      image:
        `${profile.profile_picture}` ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ3ztWTGwSgvZJvsA49k950OqfYRhhssQqaw&usqp=CAU",
    },
    currentUser.stream_chat_token
  );

  const hashedEmailHalf = hashedEmail.substring(0, 20);
  const hashedApplicantEmailHalf = hashedApplicantEmail.substring(0, 20);
  const channelId = `${hashedEmailHalf}-${hashedApplicantEmailHalf}`;
  const channel = client.channel("messaging", channelId, {
    members: [hashedEmail, hashedApplicantEmail],
    name: `${profile.first_name} ${profile.last_name} - ${first_name} ${last_name}`,
  });
  console.log(channel);
  await channel.watch();
  console.log("successfully created channel!");
  return channel;
};

export default createPrivateChat;
