import React, { useRef, useState } from "react";
import RecruiterState from "@/interfaces/recruiter/form-state-get-recruiter.interface";
import Form from "@/interfaces/applicant/form-state-get-applicant.interface";
import updateApplicantProfile from "@/helpers/updateApplicantProfile";
import updateRecruiterProfile from "@/helpers/updateRecruiterProfile";
import { Box, Button, Flex, Heading, Image, Input } from "@chakra-ui/react";

export default function RecruiterProfileUpdate({
  profile_picture,
  first_name,
  last_name,
  company_name,
  recruiter_role,
  email,
}: RecruiterState) {
  const [formData, setFormData] = useState<RecruiterState>({
    profile_picture: profile_picture,
    first_name: first_name,
    last_name: last_name,
    company_name: company_name,
    recruiter_role: recruiter_role,
    email: email,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFormData = { ...formData, [e.target.id]: e.target.value };
    setFormData(newFormData);
  };

  const getPostData = async () => {
    return {
      profile_picture: formData.profile_picture,
      first_name: formData.first_name,
      last_name: formData.last_name,
    };
  };
  const handleSubmit = async () => {
    const postData = await getPostData();
    const response = await updateRecruiterProfile(postData);
    if (response == 200) {
      window.location.reload();
    }
  };

  const profileRef = useRef<HTMLInputElement>(null);
  const handleProfileUpload = () => {
    if (profileRef.current) {
      profileRef.current.click();
    }
  };
  const handleProfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        if (event.target) {
          let base64String = event.target.result as string;
          base64String = base64String.split(",")[1];

          setFormData({
            ...formData,
            profile_picture: base64String,
          });
        }
      };

      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  return (
    <>
      <Flex className="profile-update" direction="column">
        <Heading fontSize="2xl" mt="16px" color="#2E77AE">
          Profile picture
        </Heading>
        <Input
          id="profile-picture"
          type="file"
          ref={profileRef}
          style={{ display: "none" }}
          onChange={handleProfileChange}
        />

        {formData.profile_picture && (
          <Box w="200px" mt="16px" border="#2E77AE solid 2px" overflow="hidden" position="relative">
            <Image
              w="100%"
              src={
                formData.profile_picture
                  ? `data:image/jpeg;base64,${formData.profile_picture}`
                  : "https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
              }
              alt="Profile picture"
            />
            <Button
              position="absolute"
              top="0px"
              right="0px"
              color="#2E77AE"
              bg="transparent"
              _hover={{ color: "#0D2137" }}
              onClick={() => {
                setFormData({
                  ...formData,
                  profile_picture: "",
                });
              }}
            >
              ✖
            </Button>
          </Box>
        )}
        <Flex>
          <Button
            mt="16px"
            color="white"
            bg="#2E77AE"
            _hover={{ color: "#0D2137", bg: "#6ba5d1" }}
            value={formData.profile_picture}
            onClick={handleProfileUpload}
          >
            Upload {formData.profile_picture ? "new" : ""} profile picture
          </Button>
        </Flex>

        <Heading fontSize="2xl" mt="32px" color="#2E77AE">
          First name
        </Heading>
        <Input
          mt="4px"
          w="300px"
          borderColor="#2E77AE"
          id="first_name"
          value={formData.first_name}
          onChange={handleFormChange}
        />
        <Heading fontSize="xl" mt="16px" color="#2E77AE">
          Last name
        </Heading>
        <Input
          mt="4px"
          w="300px"
          borderColor="#2E77AE"
          id="last_name"
          value={formData.last_name}
          onChange={handleFormChange}
        />
        <Flex>
          <Button mt="32px" bgColor="#FF8E2B" _hover={{ bgColor: "#fdb16e" }} color="#0D2137" onClick={handleSubmit}>
            Submit
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
