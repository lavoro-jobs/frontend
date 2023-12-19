"use client";

import InfoBox from "@/components/features/signUpIn/InfoBox";
import Header from "@/components/shared/Header";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarGroup, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Role } from "@/types/Auth";
import getCurrentRecruiterProfile from "@/helpers/getCurrentRecruiterProfile";
import getApplicantProfile from "@/helpers/getApplicantProfile";

export default function AuthLayout({ children }: any) {
  const avatars = [
    {
      name: "Google",
      url: "https://blog.hubspot.com/hs-fs/hubfs/image8-2.jpg?width=600&name=image8-2.jpg",
    },
    {
      name: "Apple",
      url: "https://www.tailorbrands.com/wp-content/uploads/2021/01/apple_logo_1988.jpg",
    },
    {
      name: "Microsoft",
      url: "https://developer.microsoft.com/_devcom/images/logo-ms-social.png",
    },
    {
      name: "Dell",
      url: "https://static.vecteezy.com/system/resources/previews/020/336/113/original/dell-logo-dell-icon-free-free-vector.jpg",
    },
    {
      name: "Nvidia",
      url: "https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/logo-and-brand/02-nvidia-logo-color-grn-500x200-4c25-p@2x.png",
    },
  ];

  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {
    const navigateTo = (path: string) => router.push(path);
    const isProfileSetupNeeded = (profile: any) => profile?.first_name === null;

    const handleRecruiterProfile = async () => {
      try {
        const profile = await getCurrentRecruiterProfile();
        const path = isProfileSetupNeeded(profile) ? "/profile-setup" : "/dashboard";
        navigateTo(path);
      } catch (error) {
        // Navigating to profile-setup if the recruiter is not in the db
        navigateTo("/profile-setup");
      }
    };

    const handleApplicantProfile = async () => {
      try {
        const profile = await getApplicantProfile();
        const path = isProfileSetupNeeded(profile) ? "/profile-setup" : "/dashboard";
        navigateTo(path);
      } catch (error) {
        // Navigating to profile-setup if the applicant is not in the db
        navigateTo("/profile-setup");
      }
    };

    const checkProfile = async () => {
      if (!auth) return;
      if (auth.role === Role.RECRUITER) {
        await handleRecruiterProfile();
      } else {
        await handleApplicantProfile();
      }
    };
    checkProfile();
  }, [auth, router]);

  return (
    <>
      <Header />
      <Flex h="100vh">
        <InfoBox>
          <div>
            <Heading fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}>
              Welcome to LAVORO, where opportunities meet talent!
            </Heading>
            <Text fontSize={{ base: "8px", md: "md", lg: "lg" }} paddingTop="16px" paddingBottom="16px">
              Whether you're seeking exceptional candidates or aiming to advance your career, our platform is your
              ultimate destination. Join a thriving community of professionals today.
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
                Join 10.000+ users
              </Text>
            </Flex>
          </div>
        </InfoBox>

        {children}
      </Flex>
    </>
  );
}
