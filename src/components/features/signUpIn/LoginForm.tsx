import signIn from "@/helpers/signIn";
import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FormState {
	email: string;
	password: string;
}

interface PostData {
	username: string;
	password: string;
}

export default function LoginForm() {
	const router = useRouter();

	const [formData, setFormData] = useState<FormState>({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const newFormData = { ...formData, [e.target.id]: e.target.value };
		setFormData(newFormData);
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const postData: PostData = {
			username: formData.email,
			password: formData.password,
		};
		try {
			const response = await signIn(postData);
			return router.push("/profile-setup");
		} catch (err) {
			setError("There was an error logging in. Please try again.");
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
			<Heading fontSize="32px">Sign in</Heading>
			<Flex gap="8px" paddingBottom="16px">
				<Text fontSize="lg">Don't have an account?</Text>
				<Link href="/signup">
					<Text fontSize="lg" as="b" color="#FF8E2B">
						Sign up
					</Text>
				</Link>
			</Flex>

			<Flex direction="column" gap="16px" w={{ base: "250px", md: "300px" }} as="form" onSubmit={handleSubmit}>
				<FormControl>
					<FormLabel htmlFor="email">Email address</FormLabel>
					<Input id="email" type="email" value={formData.email} onChange={handleFormChange} />
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="password">Password</FormLabel>

					<InputGroup>
						<Input
							id="password"
							onChange={handleFormChange}
							type={showPassword ? "text" : "password"}
							form="login-form"
						/>
						<InputRightElement width="4.5rem">
							<Button
								bgColor="#2E77AE"
								color="white"
								_hover={{ bg: "#2E77AE" }}
								h="1.5rem"
								size="sm"
								onClick={() => setShowPassword(!showPassword)}
								value={formData.password}
							>
								{showPassword ? "Hide" : "Show"}
							</Button>
						</InputRightElement>
					</InputGroup>
				</FormControl>

				<Text color="red.500">{error}</Text>
				<Button bgColor="#2E77AE" color="white" _hover={{ bgColor: "#6ba5d1", color: "#0D2137" }} type="submit">
					Submit
				</Button>
			</Flex>
		</Flex>
	);
}
