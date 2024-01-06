import getCurrentUser from "@/helpers/getCurrentUser";
import {StreamChat} from "stream-chat";
import hashEmail from "@/helpers/hashEmail";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import {Role} from "@/types/Auth";
import getRecruiterProfile from "@/helpers/getRecruiterProfile";
import getApplicantProfile from "@/helpers/getApplicantProfile";

const createStreamChatUser = async () => {
  const {auth} = useProtectedRoute([Role.APPLICANT, Role.RECRUITER]);

  const client = new StreamChat(process.env.NEXT_PUBLIC_STREAM_API_KEY);
  const res = await getCurrentUser();
  const user = res.data;
  const email = user.email;
  const stream_chat_token = user.stream_chat_token;

  let profile;
  if (auth.role === Role.RECRUITER) {
    profile = await getRecruiterProfile();
  } else if (auth.role === Role.APPLICANT) {
    profile = await getApplicantProfile();
  }

  const hashedEmail = await hashEmail(email);
  await client.connectUser(
    {
      id: hashedEmail,
      name: `${profile.first_name} ${profile.last_name}`,
      image: 'https://i.imgur.com/fR9Jz14.png',
    },
    stream_chat_token,
  )

  await client.disconnectUser();
}

export default createStreamChatUser;