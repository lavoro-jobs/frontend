import getCurrentUser from "@/helpers/getCurrentUser";
import { StreamChat } from "stream-chat";
import hashEmail from "@/helpers/hashEmail";
import { Role } from "@/types/Auth";
import getRecruiterProfile from "@/helpers/getRecruiterProfile";
import getApplicantProfile from "@/helpers/getApplicantProfile";

const createStreamChatUser = async () => {
  const client = new StreamChat("etwdd8qaagmg");
  const res = await getCurrentUser();
  const user = res.data;
  const email = user.email;
  const stream_chat_token = user.stream_chat_token;

  let profile;
  if (user.role === Role.RECRUITER) {
    profile = await getRecruiterProfile();
  } else if (user.role === Role.APPLICANT) {
    profile = await getApplicantProfile();
  }

  const hashedEmail = await hashEmail(email);
  await client.connectUser(
    {
      id: hashedEmail,
      name: `${profile.first_name} ${profile.last_name}`,
      image:
        `${profile.profile_picture}` ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ3ztWTGwSgvZJvsA49k950OqfYRhhssQqaw&usqp=CAU",
    },
    stream_chat_token
  );

};

export default createStreamChatUser;
