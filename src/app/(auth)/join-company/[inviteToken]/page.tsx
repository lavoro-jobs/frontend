"use client";
import joinCompany from "@/helpers/joinCompany";

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
import { useRouter, useParams } from "next/navigation";
import React, { useState } from "react";

interface FormState {
  firstName: string;
  lastName: string;
  password: string;
}

interface PostData {
  first_name: string;
  last_name: string;
  password: string;
}

export default function JoinCompany() {
  const router = useRouter();
  const params = useParams();

  const [formData, setFormData] = useState<FormState>({
    firstName: "",
    lastName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFormData = { ...formData, [e.target.id]: e.target.value };
    setFormData(newFormData);
  };

  const [errorSubmit, setErrorSubmit] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const postData: PostData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      password: formData.password,
    };
    try {
      if (postData.first_name && postData.last_name && postData.password) {
        setErrorSubmit(false);
        const response = await joinCompany(postData, params.inviteToken as string);
        return router.push("/dashboard");
      } else {
        setErrorSubmit(true);
      }
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
      <Flex direction="column" gap="16px" w={{ base: "250px", md: "300px" }} as="form" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="firstname">First name</FormLabel>
          <Input id="firstName" type="text" value={formData.firstName} onChange={handleFormChange} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lastname">Last name</FormLabel>
          <Input id="lastName" type="text" value={formData.lastName} onChange={handleFormChange} />
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
        <Flex direction="column" align="center">
          {errorSubmit && (
            <Text fontSize="lg" color="red">
              Please fill out all fields.
            </Text>
          )}
        </Flex>
        <Button bgColor="#2E77AE" color="white" _hover={{ bgColor: "#6ba5d1", color: "#0D2137" }} type="submit">
          Submit
        </Button>
      </Flex>
    </Flex>
  );
}
