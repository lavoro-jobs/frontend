import { Flex, Heading, Text } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";

export default function VerificationEmailSent() {
  const searchParams = useSearchParams();
  return (
    <Flex
      w={{ base: "100%", md: "50%" }}
      p="32px"
      direction="column"
      justifyContent="center"
      alignItems="center"
      bg="white"
      color="#0D2137"
    >
      <Heading fontSize="5xl" textAlign={"center"} paddingBottom="32px">
        Thanks for signing up!
      </Heading>
      <Flex gap="8px" direction="column" textAlign="center">
        <Text fontSize="2xl">Verification email has been sent to:</Text>
        <Text fontSize="3xl" fontWeight="extrabold">
          {searchParams.get("email")}
        </Text>
      </Flex>
    </Flex>
  );
}
