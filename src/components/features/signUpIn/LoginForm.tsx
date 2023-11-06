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
import { ChangeEvent, useState } from "react";

export default function LoginForm() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [emailError, setEmailError] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const validateEmail = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (emailRegex.test(email)) {
			setEmailError(false);
		} else {
			setEmailError(true);
		}
		return;
	};
	const validatePassword = () => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		if (passwordRegex.test(password)) {
			setPasswordError(false);
		} else {
			setPasswordError(true);
		}
		return;
	};

	const handleSubmit = () => {
		validateEmail();
		validatePassword();

		if (emailError || passwordError) {
			return;
		}

		const data = {
			email,
			password,
		};

		fetch("http://localhost:8000/api/v1/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => {
				if (res.ok) {
					window.location.href = "/home";
				} else {
					console.log(res);
				}
			})
			.then((data) => console.log(data))
			.then((err) => console.log(err));
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
				<Text fontSize="lg">Don't have an account?</Text>
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
				<FormControl>
					<FormLabel htmlFor="email">Email address</FormLabel>
					{emailError && (
						<Text color="red" maxW={{ base: "250px", lg: "300px" }}>
							Invalid email address.
						</Text>
					)}
					<Input
						id="email"
						type="email"
						value={email}
						onChange={handleEmail}
					/>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="password">Password</FormLabel>
					{passwordError && (
						<Text color="red" maxW={{ base: "250px", lg: "300px" }}>
							Invalid password. Password must have at least 8
							characters, one uppercase letter, one lowercase
							letter, and one number.
						</Text>
					)}
					<InputGroup>
						<Input
							id="password"
							onChange={handlePassword}
							type={showPassword ? "text" : "password"}
						/>
						<InputRightElement width="4.5rem">
							<Button
								bgColor="#2E77AE"
								color="white"
								_hover={{ bg: "#2E77AE" }}
								h="1.5rem"
								size="sm"
								onClick={handleShowPassword}
								value={password}
							>
								{showPassword ? "Hide" : "Show"}
							</Button>
						</InputRightElement>
					</InputGroup>
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
