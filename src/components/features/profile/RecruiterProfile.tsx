"use client"
import React, {useEffect, useState} from "react";
import Sidenav from "../dashboard/Sidenav";
import {Box, Button, Flex, Heading, Image, Text} from "@chakra-ui/react";
import {LiaBuildingSolid} from "react-icons/lia";
import {MdAccountBox, MdOutlineMail} from "react-icons/md";
import RecruiterState from "@/interfaces/recruiter/form-state-get-recruiter.interface";
import getCurrentRecruiterProfile from "@/helpers/getCurrentRecruiterProfile";
import getCurrentUser from "@/helpers/getCurrentUser";
import RecruiterProfileUpdate from "@/components/features/updateProfile/RecruiterProfileUpdate";

export default function RecruiterProfile() {
  const [update, setUpdate] = useState<boolean>(false);
  const [recruiterState, setRecruiterState] = useState<RecruiterState>({
    first_name: "",
    last_name: "",
    company_name: "",
    recruiter_role: "",
    email: "",
  });

  useEffect(() => {
    getCurrentRecruiterProfile().then((resp) => {
      setRecruiterState((prevState) => ({
        ...prevState,
        ...resp,
      }));
    });

    getCurrentUser().then((resp) => {
      setRecruiterState((prevState) => ({
        ...prevState,
        ...resp.data,
      }));
    });
  }, []);

  return (
    <Sidenav>
      {!update && (
        <>
          <Box bg="white" flex="1">
            <Flex direction="column" alignItems="center" className="profile-rc">
              <Image
                src="https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                w="200px"
                borderRadius="50%"
              />
              <Heading mt="16px">
                {recruiterState.first_name} {recruiterState.last_name}
              </Heading>
            </Flex>
            <Box p="80px 32px 32px 32px">
              <Heading fontSize="3xl" color="#2E77AE">
                ABOUT ME
              </Heading>

              <Flex mt="16px" gap="8px" align="center">
                <LiaBuildingSolid size="32px" />
                <Text>{recruiterState.company_name}</Text>
              </Flex>
              <Flex mt="16px" align="center" gap="8px">
                <MdOutlineMail size="32px" />
                <Text>{recruiterState.email}</Text>
              </Flex>
              <Flex mt="16px" align="center" gap="8px">
                <MdAccountBox size="32px" />
                <Text>{recruiterState.recruiter_role}</Text>
              </Flex>

              <Box mt="32px" mb="32px" border="1px solid #2E77AE" width="100%" />

              <Button colorScheme="blue" onClick={() => setUpdate(!update)}>
                Edit
              </Button>
            </Box>
          </Box>
        </>
      )}
      {update && (
        <Box bg="white" p="32px">
          <Button alignSelf="flex-end" colorScheme="blue" onClick={() => setUpdate(!update)}>
            Cancel
          </Button>
          <RecruiterProfileUpdate
            first_name={recruiterState.first_name}
            last_name={recruiterState.last_name}
            company_name={recruiterState.company_name}
            recruiter_role={recruiterState.recruiter_role}
            email={recruiterState.email}
          />
        </Box>
      )}
    </Sidenav>
  );
}
