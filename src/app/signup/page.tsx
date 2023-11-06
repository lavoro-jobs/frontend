'use client'

import InfoBox from '@/components/features/signUpIn/InfoBox';
import RegisterForm from '@/components/features/signUpIn/RegisterForm';
import { Avatar, AvatarGroup, Flex, Heading, Show, Stack, Text } from '@chakra-ui/react'

export default function SignUp() {
  const avatars = [
    {
      name: 'Apis IT',
      url: 'https://yt3.googleusercontent.com/pa5MTr_cgxmjKRVcvLGlSa1IAD1uYrm-nX796LeEQaLRdzIpDIX7XYRJITB9l7Lk7Je6mb0VLg=s900-c-k-c0x00ffffff-no-rj',
    },
    {
      name: 'Steve Jobs',
      url: 'https://atlantico-media.s3.eu-west-3.amazonaws.com/jobs_4a171b2e6b.jpg',
    },
    {
      name: 'Infinum',
      url: 'https://wp-assets.infinum.com/uploads/2022/03/infinum-mark-organization-big.jpg',
    },
    {
      name: 'Bill Gates',
      url: 'https://cdn.britannica.com/47/188747-050-1D34E743/Bill-Gates-2011.jpg',
    },
    {
      name: 'Eminem',
      url: 'https://ntvb.tmsimg.com/assets/assets/182420_v9_bc.jpg',
    },
  ]

  return (
    <Flex h="100vh">
        <InfoBox>
          <div>
            <Heading fontSize={{base: "2xl", sm: "3xl", md: "4xl", lg: "5xl"}}>
              We're looking for job recruiters and applicants.
            </Heading>
            <Text fontSize={{base: "sm", md: "md", lg: "lg"}} paddingTop="16px" paddingBottom="16px">Create an account and something something.</Text>
            <Flex>
              <Stack paddingTop="16px" paddingBottom="16px">
                <AvatarGroup>
                  {avatars.map((avatar) => (
                    <Avatar
                      key={avatar.name}
                      name={avatar.name}
                      src={avatar.url}
                    />
                  ))}
                </AvatarGroup>
              </Stack>
              <Text alignSelf="center" paddingLeft="16px" fontSize={{base: "sm", lg: "md"}}>Join 5+ users</Text>
            </Flex>
          </div>
        </InfoBox>

      <RegisterForm />

    </Flex>
  )
}
