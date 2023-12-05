import signUp from "@/helpers/signUp";
import {
	Button,
	chakra,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Select,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FormState {
	role: "applicant" | "recruiter";
	email: string;
	password: string;
}

interface PostData {
	role: "applicant" | "recruiter";
	email: string;
	password: string;
}

export default function RegisterForm() {
	const router = useRouter();
	const [formData, setFormData] = useState<FormState>({
		role: "applicant",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const postData: PostData = { ...formData };
		try {
			const response = await signUp(postData);

			if (response.status === 200) {
				router.push(`/verification-email-sent?email=${formData.email}`);
			} else {
				const { detail } = response.data;
				setError(detail);
			}
		} catch (error) {
			console.error("Error:", error);
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
			<Heading fontSize="32px">Create an account</Heading>
			<Flex gap="8px" paddingBottom="16px">
				<Text fontSize="lg">Have an account?</Text>
				<Link href="/signin">
					<Text fontSize="lg" as="b" color="#FF8E2B">
						Sign In
					</Text>
				</Link>
			</Flex>

			<Flex
				direction="column"
				gap="16px"
				w={{ base: "250px", md: "300px" }}
				as="form"
				action={signUp}
				onSubmit={handleSubmit}
			>
				<Select bgColor="#2E77AE" id="role" value={formData.role} onChange={handleFormChange} color="white">
					<chakra.option color="black" id="applicant" value="applicant">
						Applicant
					</chakra.option>
					<chakra.option color="black" id="recruiter" value="recruiter">
						Recruiter
					</chakra.option>
				</Select>

				<FormControl isInvalid={isEmailInvalid(formData.email)}>
					<FormLabel htmlFor="email">Email address</FormLabel>
					<Input id="email" type="email" value={formData.email} onChange={handleFormChange} />
					<FormErrorMessage>Email is invalid.</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={isPasswordInvalid(formData.password)}>
					<FormLabel htmlFor="password">Password</FormLabel>

					<InputGroup>
						<Input id="password" onChange={handleFormChange} type={showPassword ? "text" : "password"} />
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
					<FormErrorMessage>Invalid password. Password must have at least 8 characters</FormErrorMessage>
				</FormControl>

				<Text color="red">{error}</Text>
				<Button bgColor="#2E77AE" color="white" _hover={{ bgColor: "#6ba5d1", color: "#0D2137" }} type="submit">
					Submit
				</Button>
			</Flex>
		</Flex>
	);
}
