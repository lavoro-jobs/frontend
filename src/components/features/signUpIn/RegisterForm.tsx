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
} from "@chakra-ui/react"
import Link from "next/link"
import React, { useState } from "react"

interface FormState {
    role: "applicant" | "recruiter"
    companyName: string
    email: string
    password: string
}

interface PostData {
    role: "applicant" | "recruiter"
    companyName?: string
    email: string
    password: string
}

export default function RegisterForm() {
    const [formData, setFormData] = useState<FormState>({
        role: "applicant",
        email: "",
        password: "",
        companyName: "",
    })
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newFormData = { ...formData, [e.target.id]: e.target.value }
        if (e.target.name === "role") {
            newFormData.companyName = ""
        }
        setFormData(newFormData)
    }

    const isCompanyNameInvalid = (text: string) => {
        const textRegex = /^[a-z ,.'-]+$/i
        return !textRegex.test(text)
    }

    const isEmailInvalid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(email)
    }

    const isPasswordInvalid = (password: string) => {
        return password.length < 8
    }

    const handleSubmit = async () => {
        const payload: PostData = {
            role: formData.role,
            email: formData.email,
            password: formData.password,
            companyName: formData.companyName ? formData.companyName : undefined,
        }

        const response = await fetch("http://localhost:8000/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(payload as any),
        })
    }

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

            <Flex direction="column" gap="16px" w={{ base: "250px", md: "300px" }}>
                <Select bgColor="#2E77AE" id="role" value={formData.role} onChange={handleFormChange} color="white">
                    <chakra.option color="black" id="applicant" value="applicant">
                        Applicant
                    </chakra.option>
                    <chakra.option color="black" id="recruiter" value="recruiter">
                        Recruiter
                    </chakra.option>
                </Select>

                {formData.role === "recruiter" && (
                    <FormControl isInvalid={isCompanyNameInvalid(formData.companyName)}>
                        <FormLabel htmlFor="companyName">Company name</FormLabel>
                        <Input id="companyName" type="text" value={formData.companyName} onChange={handleFormChange} />
                        <FormErrorMessage>Company name is required.</FormErrorMessage>
                    </FormControl>
                )}

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
    )
}
