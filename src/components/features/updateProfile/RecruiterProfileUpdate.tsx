import React, {useState} from "react";
import RecruiterState from "@/interfaces/recruiter/form-state-get-recruiter.interface";
import Form from "@/interfaces/applicant/form-state-get-applicant.interface";
import updateApplicantProfile from "@/helpers/updateApplicantProfile";
import updateRecruiterProfile from "@/helpers/updateRecruiterProfile";
import {Box, Button, Flex, Heading, Input} from "@chakra-ui/react";

export default function RecruiterProfileUpdate({
                                                 first_name,
                                                 last_name,
                                                 company_name,
                                                 recruiter_role,
                                                 email
                                               }: RecruiterState) {

  const [formData, setFormData] = useState<RecruiterState>({
    first_name: first_name,
    last_name: last_name,
    company_name: company_name,
    recruiter_role: recruiter_role,
    email: email
  })

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFormData = {...formData, [e.target.id]: e.target.value};
    setFormData(newFormData);
  };

  const getPostData = async () => {
    return ({
      first_name: formData.first_name,
      last_name: formData.last_name
    })
  }
  const handleSubmit = async () => {
    const postData = await getPostData();
    const response = await updateRecruiterProfile(postData);
    if (response == 200) {
      window.location.reload();
    }
  };

  return (
    <>
      <Flex gap="32px">
        <Flex gap="8px" justify="space-between">
          <Box w="49%">
            <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
              First name
            </Heading>
            <Input
              w="100%"
              borderColor="#2E77AE"
              id="first_name"
              value={formData.first_name}
              onChange={handleFormChange}
            />
          </Box>
          <Box w="49%">
            <Heading fontSize="xl" pt="16px" pb="8px" color="#2E77AE">
              Last name
            </Heading>
            <Input
              w="100%"
              borderColor="#2E77AE"
              id="last_name"
              value={formData.last_name}
              onChange={handleFormChange}
            />
          </Box>
        </Flex>
        <Button mt="32px" colorScheme="blue" onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
    </>
  )
}
