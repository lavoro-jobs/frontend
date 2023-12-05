import confirmEmail from "@/helpers/confirmEmail";
import { Flex, Text } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ConfirmationStatus {
	status: true | false | null;
	message: string;
}

export default function EmailConfirmBox() {
	const params = useParams();
	const router = useRouter();
	const [confirmationStatus, setConfirmationStatus] = useState<ConfirmationStatus>({
		status: null,
		message: "Verify your email address... Please wait...",
	});
	useEffect(() => {
		const confirm = async () => {
			if (params.verificationToken) {
				const response = await confirmEmail(params.verificationToken as string);
				if (response.status === 200) {
					setConfirmationStatus({
						status: true,
						message: "Your email address has been confirmed. You will be redirected to the sign in page in 5 seconds.",
					});
					setTimeout(() => {
						router.push("/signin");
					}, 5000);
				} else {
					setConfirmationStatus({
						status: false,
						message: "Your email address has NOT been confirmed. This link may have expired.",
					});
				}
			}
		};
		confirm();
	}, []);

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
