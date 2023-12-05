import { Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function InfoBox({ children }: { children: ReactNode }) {
	return (
		<Flex
			p="32px"
			display={{ base: "none", md: "flex" }}
			w="50%"
			direction="column"
			justifyContent="space-between"
			bg="#0071c6"
			color="white"
		>
			<div></div>
			{children}
			<Text>© 2023. Lavoro. All rights reserved.</Text>
		</Flex>
	);
}
