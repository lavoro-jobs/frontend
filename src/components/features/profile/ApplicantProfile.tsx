import { Avatar, Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Sidenav from "../dashboard/Sidenav";
import { LiaBirthdayCakeSolid, LiaCertificateSolid } from "react-icons/lia";
import { FaGenderless, FaLocationDot } from "react-icons/fa6";
import { IoBriefcaseSharp, IoMaleSharp } from "react-icons/io5";
import { IoFemaleSharp } from "react-icons/io5";
import getAllCatalogs from "@/helpers/getAllCatalogs";
import { FaGraduationCap } from "react-icons/fa";
import getApplicantProfile from "@/helpers/getApplicantProfile";
import ApplicantProfileUpdate from "../updateProfile/ApplicantProfileUpdate";
import Experience from "@/interfaces/shared/experience";
import FormOptions from "@/interfaces/shared/formOptions";

{
  /* TODO - kad se doda id na get-applicant-profile izbrisat ovo i importat FormState iz form-state-get-applicant.interface */
}
interface FormState {
  first_name: string;
  last_name: string;
  education_level: string;
  age: number | undefined;
  gender: string;
  skills: string[];
  experiences: Experience[];
  work_type: number | undefined;
  seniority_level: number | undefined;
  position: number | undefined;
  home_location: {
    longitude: number | undefined;
    latitude: number | undefined;
  };
  work_location_max_distance: number | undefined;
  contract_type: number | undefined;
  min_salary: number | undefined;
}

export default function ApplicantProfile() {
  const [formOptions, setFormOptions] = useState<FormOptions>({});

  {
    /* TODO - geocode */
  }
  const [address, setAddress] = useState<string>("");

  const [update, setUpdate] = useState<boolean>(false);

  {
    /* TODO - kad se doda id na get-applicant-profile uredit ovo */
  }
  const [formData, setFormData] = useState<FormState>({
    first_name: "",
    last_name: "",
    education_level: "",
    age: undefined,
    gender: "",
    skills: [],
    experiences: [],
    work_type: undefined,
    seniority_level: undefined,
    position: undefined,
    home_location: {
      longitude: undefined,
      latitude: undefined,
    },
    work_location_max_distance: undefined,
    contract_type: undefined,
    min_salary: undefined,
  });

  useEffect(() => {
    getApplicantProfile().then((resp) => {
      setFormData(resp);
    });
  }, []);

  useEffect(() => {
    getAllCatalogs().then((resp) => {
      setFormOptions(resp);
    });
  }, []);

  return (
    <Sidenav>
      <Box position="absolute" right="calc(50% - 100px)" transform="translateX(50%)">
        <Flex w="600px" align="center" padding="32px" direction="column" bg="#E0EAF5">
          {update && (
            <Button alignSelf="flex-end" colorScheme="blue" onClick={() => setUpdate(!update)}>
              Cancel
            </Button>
          )}
          {!update && (
            <>
              <Avatar size="2xl"></Avatar>
              <Heading mt="16px">
                {formData.first_name} {formData.last_name}
              </Heading>
              <Text fontSize="md" color="gray.500" mt="2px">
                Address: {address}
              </Text>
              <Text fontSize="sm" color="gray.500" mt="2px">
                Max distance: {formData.work_location_max_distance} km
              </Text>
              <Flex align="center" gap="16px" mt="8px">
                <Flex gap="4px">
                  <LiaBirthdayCakeSolid size="22px" />
                  <Text>{formData.age}</Text>
                </Flex>
                {formData.gender == "male" && <IoMaleSharp size="18px" />}
                {formData.gender == "female" && <IoFemaleSharp size="18px" />}
                {formData.gender == "other" && <FaGenderless size="18px" />}
              </Flex>
              <Box mt="32px" border="1px solid #2E77AE" width="80%" />
              <Heading mt="32px" mb="16px">
                {formData.position}
              </Heading>
              <p>
                {formData.skills &&
                  formData.skills.map((skill, index) => (
                    <Text
                      key={index}
                      display="inline-block"
                      px="2"
                      py="1"
                      mr="2"
                      mb="2"
                      borderRadius="md"
                      backgroundColor="blue.500"
                      color="white"
                    >
                      {skill}
                    </Text>
                  ))}
              </p>
              <Flex mt="16px" align="center" gap="8px">
                <FaGraduationCap size="24px" />
                <Text>{formData.education_level}</Text>
              </Flex>
              <Flex mt="16px" align="center" gap="8px">
                <LiaCertificateSolid size="24px" />
                <Text>Seniority level - {formData.seniority_level}</Text>
              </Flex>
              <Flex mt="16px" align="center" gap="8px">
                <FaLocationDot size="24px" />
                <Text>{formData.work_type}</Text>
              </Flex>
              <Flex mt="16px" align="center" gap="8px">
                <IoBriefcaseSharp size="24px" />
                <Text>{formData.contract_type}</Text>
              </Flex>

              <Box mt="32px" border="1px solid #2E77AE" width="80%" />
              <Button mt="32px" colorScheme="blue" onClick={() => setUpdate(!update)}>
                Edit
              </Button>
            </>
          )}
          {update && (
            <>
              <ApplicantProfileUpdate
                first_name={formData.first_name}
                last_name={formData.last_name}
                age={formData.age}
                gender={formData.gender}
                work_location_max_distance={formData.work_location_max_distance}
                min_salary={formData.min_salary}
                seniority_level_id={formData.seniority_level}
                home_location={formData.home_location}
                experiences={formData.experiences}
              ></ApplicantProfileUpdate>
            </>
          )}
        </Flex>
      </Box>
    </Sidenav>
  );
}
