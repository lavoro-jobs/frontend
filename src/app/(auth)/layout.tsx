"use client";

import InfoBox from "@/components/features/signUpIn/InfoBox";
import Header from "@/components/shared/Header";
import useAuth from "@/hooks/useAuth";
import {Avatar, AvatarGroup, Flex, Heading, Stack, Text} from "@chakra-ui/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {Role} from "@/types/Auth";
import getCurrentRecruiterProfile from "@/helpers/getCurrentRecruiterProfile";

export default function AuthLayout({ children }: any) {
  const avatars = [
    {
      name: "Apis IT",
      url: "https://yt3.googleusercontent.com/pa5MTr_cgxmjKRVcvLGlSa1IAD1uYrm-nX796LeEQaLRdzIpDIX7XYRJITB9l7Lk7Je6mb0VLg=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      name: "Steve Jobs",
      url: "https://atlantico-media.s3.eu-west-3.amazonaws.com/jobs_4a171b2e6b.jpg",
    },
    {
      name: "Infinum",
      url: "https://wp-assets.infinum.com/uploads/2022/03/infinum-mark-organization-big.jpg",
    },
    {
      name: "Bill Gates",
      url: "https://cdn.britannica.com/47/188747-050-1D34E743/Bill-Gates-2011.jpg",
    },
    {
      name: "Eminem",
      url: "https://ntvb.tmsimg.com/assets/assets/182420_v9_bc.jpg",
    },
  ];

  const router = useRouter();
  const { auth } = useAuth();



  useEffect(() => {
    const checkProfile = async () => {
      if (auth) {
        if (auth?.role == Role.RECRUITER) {
          try {
            const response = await getCurrentRecruiterProfile();
            let isInvitedRecruiter = response?.first_name !== null;
            if (isInvitedRecruiter) {
              return router.push("/profile-setup");
            }
          } catch (err) {
            return router.push("/profile-setup");
          }
        } else {
           return router.push("/profile-setup");
        }
      }
    }
    checkProfile()
  }, [auth]);

  return (
    <>
      <Header />
      <Flex h="100vh">
        <InfoBox>
          <div>
            <Heading fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}>
              We're looking for job recruiters and applicants.
            </Heading>
            <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} paddingTop="16px" paddingBottom="16px">
              Create an account and something something.
            </Text>
            <Flex>
              <Stack paddingTop="16px" paddingBottom="16px">
                <AvatarGroup>
                  {avatars.map((avatar) => (
                    <Avatar key={avatar.name} name={avatar.name} src={avatar.url} />
                  ))}
                </AvatarGroup>
              </Stack>
              <Text alignSelf="center" paddingLeft="16px" fontSize={{ base: "sm", lg: "md" }}>
                Join 5+ users
              </Text>
            </Flex>
          </div>
        </InfoBox>

        {children}
      </Flex>
    </>
  );
}
