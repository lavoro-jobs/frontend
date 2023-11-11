import { Button, Flex, Heading, Text } from "@chakra-ui/react"
import Link from "next/link"

export default function Confirm() {
  return (
    <Flex minH="100vh" direction="column" justify="center" align="center">
      <Heading p="8px">Confirmation link has been sent to your email.</Heading>
      <Link href="/signin">
        <Button colorScheme="blue">Sign In</Button>
      </Link>
    </Flex>
  )
}
