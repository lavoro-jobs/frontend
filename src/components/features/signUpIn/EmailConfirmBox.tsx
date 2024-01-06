import confirmEmail from "@/helpers/confirmEmail";
import axios from "axios";
import { Flex, Text } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import createStreamChatUser from "@/helpers/createStreamChatUser";

interface ConfirmationStatus {
  status: true | false | null;
  message: string;
}

export default function EmailConfirmBox() {
  const params = useParams();
  const router = useRouter();
  const [confirmationStatus, setConfirmationStatus] = useState<ConfirmationStatus>({
    status: null,
    message: "Verifying your email address... Please wait...",
  });

  useEffect(() => {
    if (params.verificationToken) {
      confirmUserEmail(params.verificationToken as string);
    }
  }, []);

  const confirmUserEmail = async (token: string) => {
    try {
      const response = await confirmEmail(token);
      handleEmailConfirmationResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  const handleEmailConfirmationResponse = (response: any) => {
    if (response.status === 200) {
      updateConfirmationStatus(true, "Your email address has been confirmed. You will be redirected to the sign in page in 5 seconds.");
      createStreamChatUser();
      setTimeout(() => router.push("/signin"), 5000);
    } else {
      updateConfirmationStatus(false, "Your email address has NOT been confirmed. This link may have expired.");
    }
  };

  const updateConfirmationStatus = (status: boolean, message: string) => {
    setConfirmationStatus({ status, message });
  };

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.detail || 'An unknown error occurred';
      updateConfirmationStatus(false, message);
    } else {
      updateConfirmationStatus(false, 'An unknown error occurred');
    }
  };

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
      <Flex gap="8px" direction="column" textAlign="center">
        <Text fontSize="3xl">{confirmationStatus.message}</Text>
      </Flex>
    </Flex>
  );
}
