'use client'

import InfoBox from "@/components/features/signUpIn/InfoBox"
import LoginForm from "@/components/features/signUpIn/LoginForm"
import { Flex, Heading, Text } from "@chakra-ui/react"

export default function SignIn() {
  return (
    <Flex h="100vh">
      <InfoBox>
        <div>
          <Heading fontSize={{base: "2xl", sm: "3xl", md: "4xl", lg: "5xl"}}>
            Welcome back! Some motivational text.
          </Heading>
          <Text fontSize={{base: "sm", md: "md", lg: "lg"}} paddingTop="16px" paddingBottom="16px">Something something something something.</Text>
        </div>
      </InfoBox>

      <LoginForm />
    </Flex>
  )
}
