import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

interface FormState {
	email: string;
	password: string;
}

interface PostData {
	username: string;
	password: string;
}

export default function LoginForm() {
	const [formData, setFormData] = useState<FormState>({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const newFormData = { ...formData, [e.target.id]: e.target.value };
		setFormData(newFormData);
	};

	const isEmailInvalid = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return !emailRegex.test(email);
	};

	const isPasswordInvalid = (password: string) => {
		return password.length < 8;
	};

	const handleSubmit = async () => {
		const payload: PostData = {
			username: formData.email,
			password: formData.password,
		};

		const response = await fetch(" http://localhost:8000/api/v1/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams(payload as any),
		});
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
			<Heading fontSize="32px">Login</Heading>
			<Flex gap="8px" paddingBottom="16px">
				<Text fontSize="lg">Dont have an account?</Text>
				<Link href="/signup">
					<Text fontSize="lg" as="b" color="#FF8E2B">
						Sign Up
					</Text>
				</Link>
			</Flex>

			<Flex
				direction="column"
				gap="16px"
				w={{ base: "300px", sm: "400px", md: "300px", lg: "400px" }}
			>
				<FormControl isInvalid={isEmailInvalid(formData.email)}>
					<FormLabel htmlFor="email">Email address</FormLabel>
					<Input
						id="email"
						type="email"
						value={formData.email}
						onChange={handleFormChange}
					/>
					<FormErrorMessage>Email is invalid.</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={isPasswordInvalid(formData.password)}>
					<FormLabel htmlFor="password">Password</FormLabel>
					<InputGroup>
						<Input
							id="password"
							onChange={handleFormChange}
							type={showPassword ? "text" : "password"}
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
					<FormErrorMessage>
						Invalid password. Password must have at least 8 characters.
					</FormErrorMessage>
				</FormControl>

				<Button
					bgColor="#2E77AE"
					color="white"
					_hover={{ bgColor: "#6ba5d1", color: "#0D2137" }}
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</Flex>
		</Flex>
	);
}
