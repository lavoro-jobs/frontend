'use client'

import { chakra, Avatar, AvatarGroup, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Select, Show, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'

export default function SignUp() {
  const [role, setRole] = useState<string>("applicant");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [companyNameError, setCompanyNameError] = useState<boolean>(false);

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    setFirstNameError(false);
  }
  const handleLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    setLastNameError(false);
  }
  const handleCompanyName = (e: ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
    setCompanyNameError(false);
  }
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)){
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    return;
  }
  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (passwordRegex.test(password)){
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
    return;
  }
  const validateFirstName = () => {
    const firstNameRegex = /^[a-z ,.'-]+$/i;
    if (firstNameRegex.test(firstName)){
      setFirstNameError(false);
    } else {
      setFirstNameError(true);
    }
    return;
  }
  const validateLastName = () => {
    const lastNameRegex = /^[a-z ,.'-]+$/i;
    if (lastNameRegex.test(lastName)){
      setLastNameError(false);
    } else {
      setLastNameError(true);
    }
    return;
  }
  const validateCompanyName = () => {
    const companyNameRegex = /^[a-z ,.'-]+$/i;
    if (companyNameRegex.test(companyName)){
      setCompanyNameError(false);
    } else {
      setCompanyNameError(true);
    }
    return;
  }

  const handleSubmit = () => {
    validateFirstName();
    validateLastName();
    if (role === "recruiter")
      validateCompanyName();
    validateEmail();
    validatePassword();

    if (firstNameError || lastNameError || emailError || passwordError){
      return
    } else if (role === "recruiter" && companyNameError) {
      return
    }

    const data = {
      role,
      firstName,
      lastName,
      companyName: role === 'recruiter' ? companyName : '',
      email,
      password
    };

    fetch('http://localhost:8000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then((res) => console.log(res))
    .then((data) => console.log(data))
    .then((err) => console.log(err))
  }

  const breakpoints = {
    base: "360px",
    sm: "580px",
    md: "680px",
    lg: "960px", 
    xl: "1080px",
    "2xl": "1280px",
    "3xl": "1440px",
    "4xl": "1600px",
    "5xl": "2560px",
  };

  const avatars = [
    {
      name: 'Ryan Florence',
      url: 'https://bit.ly/ryan-florence',
    },
    {
      name: 'Segun Adebayo',
      url: 'https://bit.ly/sage-adebayo',
    },
    {
      name: 'Kent Dodds',
      url: 'https://bit.ly/kent-c-dodds',
    },
    {
      name: 'Prosper Otemuyiwa',
      url: 'https://bit.ly/prosper-baba',
    },
    {
      name: 'Christian Nwamba',
      url: 'https://bit.ly/code-beast',
    },
  ]

  return (
    <Flex h="100vh">

      <Show above="960px">
        <Flex 
          p="32px" 
          w="50%"
          direction="column" 
          justifyContent="space-between"
          bg="#2E77AE" 
          color="white"
        >
          <Heading>Lavoro</Heading>

          <div>
            <Heading fontSize="5xl">
              We're looking for job recruiters and applicants.
            </Heading>
            <Text fontSize="lg" paddingTop="16px" paddingBottom="16px">Create an account and something something.</Text>
            <Flex>
              <Stack paddingTop="16px" paddingBottom="16px">
                <AvatarGroup>
                  {avatars.map((avatar) => (
                    <Avatar
                      key={avatar.name}
                      name={avatar.name}
                      src={avatar.url}
                    />
                  ))}
                </AvatarGroup>
              </Stack>
              <Text alignSelf="center" paddingLeft="16px">Join 5+ users</Text>
            </Flex>
          </div>

          <Text>© 2023. Lavoro. All rights reserved.</Text>
        </Flex>
      </Show>

      <Flex 
        w={{base: '100%', md: "50%"}}
        p="32px"
        direction="column" 
        justifyContent="center"
        alignItems="center"
        bg="white"
        color="#0D2137"
        margin="0 auto"
      > 
        <Heading fontSize="32px">Create an account</Heading>
        <Flex gap="8px" paddingBottom="16px">
          <Text fontSize="lg">Have an account?</Text>
          <Link href="/signin">
            <Text fontSize="lg" as="b" color="#FF8E2B">Sign In</Text>
          </Link>
        </Flex>

        <Flex direction="column" gap="16px" w={{base: "250px", lg: "300px"}}>
          <Select 
            bgColor="#2E77AE"
            value={role}
            onChange={handleRoleChange}
            color="white"
          >
            <chakra.option color="black" id="applicant" value="applicant">Applicant</chakra.option>
            <chakra.option color="black" id="recruiter" value="recruiter">Recruiter</chakra.option>
          </Select>

          <FormControl>
            <FormLabel htmlFor="firstName">First name</FormLabel>
            {firstNameError && (
              <Text color="red" maxW={{base: "250px", lg: "300px"}}>First name required.</Text>
            )}
            <Input 
              id="firstName" 
              type='text' 
              value={firstName} 
              onChange={handleFirstName} 
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="lastName">Last name</FormLabel>
            {lastNameError && (
              <Text color="red" maxW={{base: "250px", lg: "300px"}}>Last name required.</Text>
            )}
            <Input id="lastName" type='text' value={lastName} onChange={handleLastName}/>
          </FormControl>

          {role === "recruiter" && (
            <FormControl>
              <FormLabel htmlFor="companyName">Company name</FormLabel>
              {companyNameError && (
                <Text color="red" maxW={{base: "250px", lg: "300px"}}>Company name required.</Text>
              )}
              <Input id="companyName" type='text' value={companyName} onChange={handleCompanyName}/>
            </FormControl>
          )}

          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            {emailError && (
              <Text color="red" maxW={{base: "250px", lg: "300px"}}>Invalid email address.</Text>
            )}
            <Input id="email" type='email' value={email} onChange={handleEmail}/>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            {passwordError && (
              <Text color="red" maxW={{base: "250px", lg: "300px"}}>Invalid password. Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one number.</Text>
            )}
            <InputGroup>
              <Input id="password" onChange={handlePassword} type={showPassword ? 'text' : 'password'} />
              <InputRightElement width='4.5rem'>
                <Button 
                  bgColor="#2E77AE" 
                  color="white" 
                  _hover={{bg: "#2E77AE"}} 
                  h='1.5rem' 
                  size='sm' 
                  onClick={handleShowPassword}
                  value={password}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button 
            bgColor="#2E77AE" 
            color="white" 
            _hover={{bgColor: "#6ba5d1", color: "#0D2137"}}
            onClick={handleSubmit}
          >
            Submit
          </Button>

        </Flex>

      </Flex>

    </Flex>
  )
}
