import { Avatar, Box, Button, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Sidenav from "../dashboard/Sidenav";
import { LiaBirthdayCakeSolid, LiaCertificateSolid } from "react-icons/lia";
import { FaGenderless, FaLocationDot } from "react-icons/fa6";
import { IoBriefcaseSharp, IoMaleSharp } from "react-icons/io5";
import { IoFemaleSharp } from "react-icons/io5";
import getAllCatalogs from "@/helpers/getAllCatalogs";
import { FaGraduationCap } from "react-icons/fa";
import getApplicantProfile from "@/helpers/getApplicantProfile";
import ApplicantProfileUpdate from "../updateProfile/ApplicantProfileUpdate";
import Form from "@/interfaces/applicant/form-state-get-applicant.interface";
import FormOptions from "@/interfaces/shared/formOptions";
import { GrLocation } from "react-icons/gr";
import { FaFileDownload } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

export default function ApplicantProfile() {
  /* TODO - geocode */
  const [address, setAddress] = useState<string>("");
  const [update, setUpdate] = useState<boolean>(false);

  const [formData, setFormData] = useState<Form>({
    first_name: "",
    last_name: "",
    education_level: {
      id: undefined,
      education_level: "",
    },
    age: undefined,
    gender: "",
    skills: [],
    experiences: [],
    cv: "",
    work_type: {
      id: undefined,
      work_type: "",
    },
    seniority_level: undefined,
    position: {
      id: undefined,
      position_name: "",
    },
    home_location: {
      longitude: undefined,
      latitude: undefined,
    },
    work_location_max_distance: undefined,
    contract_type: {
      id: undefined,
      contract_type: "",
    },
    min_salary: undefined,
  });

  useEffect(() => {
    getApplicantProfile().then((resp) => {
      setFormData(resp);
    });
  }, []);

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);
  const downloadFile = () => {
    const linkSource = `data:application/pdf;base64,${formData.cv}`;
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = linkSource;
      downloadLinkRef.current.download = "cv";
    }
  };

  return (
    <Sidenav>
      {!update && (
        <>
          <Flex w="100%" justify="space-between" minHeight="calc(100vh - 32px)">
            <Box bg="#E0EAF5" flex="1">
              <Flex direction="column" alignItems="center" className="profile">
                <Image
                  src="https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                  w="200px"
                  borderRadius="50%"
                ></Image>
                <Heading mt="16px">
                  {formData.first_name} {formData.last_name}
                </Heading>
              </Flex>
              <Box p="64px 32px 32px 32px">
                <Heading fontSize="3xl" pb="8px" color="#2E77AE">
                  ABOUT ME
                </Heading>

                <Flex mt="16px" gap="8px" align="center">
                  <LiaBirthdayCakeSolid size="32px" />
                  <Text>{formData.age} years old</Text>
                </Flex>
                {formData.gender == "male" && (
                  <Flex mt="16px" align="center" gap="8px">
                    <IoMaleSharp size="32px" />
                    <Text>Male</Text>
                  </Flex>
                )}
                {formData.gender == "female" && (
                  <Flex mt="16px" align="center" gap="8px">
                    <IoFemaleSharp size="32px" />
                    <Text>Female</Text>
                  </Flex>
                )}
                {formData.gender == "other" && (
                  <Flex mt="16px" align="center" gap="8px">
                    <FaGenderless size="32px" />
                    <Text>Other</Text>
                  </Flex>
                )}
                <Flex mt="16px" align="center" gap="8px">
                  <MdOutlineMail size="32px" />
                  <Text>email@gmail.com</Text>
                </Flex>
                <Flex mt="16px" gap="8px" align="center">
                  <GrLocation size="32px" />
                  <Text>{address}</Text>
                </Flex>

                <Box mt="32px" mb="32px" border="1px solid #2E77AE" width="100%" />
                <Flex color="#2E77AE" mt="16px" align="center" gap="8px">
                  <FaFileDownload size="24px" />
                  <a ref={downloadLinkRef} onClick={downloadFile}>
                    Download CV
                  </a>
                </Flex>
              </Box>
            </Box>

            <Flex direction="column" alignItems="center" bgColor="white" flex="2">
              <Heading size="2xl" mt="32px" mb="32px">
                {formData.position.position_name}
              </Heading>
              <p>
                {formData.skills &&
                  formData.skills.map((skill, index) => (
                    <Text
                      key={index}
                      display="inline-block"
                      px="3"
                      py="2"
                      mr="2"
                      mb="2"
                      borderRadius="md"
                      backgroundColor="blue.500"
                      color="white"
                    >
                      {skill.skill_name}
                    </Text>
                  ))}
              </p>
              <Flex mt="32px" align="center" gap="8px">
                <FaGraduationCap size="24px" />
                <Text>{formData.education_level.education_level}</Text>
              </Flex>
              <Flex mt="16px" align="center" gap="8px">
                <LiaCertificateSolid size="24px" />
                <Text>Seniority level - {formData.seniority_level}</Text>
              </Flex>
              <Flex mt="16px" align="center" gap="8px">
                <FaLocationDot size="24px" />
                <Text>{formData.work_type.work_type}</Text>
              </Flex>
              <Flex mt="16px" align="center" gap="8px">
                <IoBriefcaseSharp size="24px" />
                <Text>{formData.contract_type.contract_type}</Text>
              </Flex>

              <Box mt="32px" mb="32px" border="1px solid #2E77AE" width="60%" />
              <Heading fontSize="3xl" pb="16px" color="#2E77AE">
                WORK EXPERIENCE
              </Heading>

              {formData.experiences.map((experience, index) => (
                <>
                  <Text mb="8px" key={index}>
                    Company name - {experience.company_name}
                  </Text>
                  <Text mb="8px" key={index}>
                    Position - {experience.position_id}
                  </Text>
                  <Text mb="32px" key={index}>
                    Years - {experience.years}
                  </Text>
                </>
              ))}

              <Box border="1px solid #2E77AE" width="60%" />
              <Button mt="32px" mb="32px" colorScheme="blue" onClick={() => setUpdate(!update)}>
                Edit
              </Button>
            </Flex>
          </Flex>
        </>
      )}

      {update && (
        <Box bg="white" p="32px">
          <Button alignSelf="flex-end" colorScheme="blue" onClick={() => setUpdate(!update)}>
            Cancel
          </Button>
          <ApplicantProfileUpdate
            first_name={formData.first_name}
            last_name={formData.last_name}
            education_level={formData.education_level}
            age={formData.age}
            gender={formData.gender}
            skills={formData.skills}
            experiences={formData.experiences}
            cv={formData.cv}
            work_type={formData.work_type}
            seniority_level={formData.seniority_level}
            position={formData.position}
            home_location={formData.home_location}
            work_location_max_distance={formData.work_location_max_distance}
            contract_type={formData.contract_type}
            min_salary={formData.min_salary}
          ></ApplicantProfileUpdate>
        </Box>
      )}
    </Sidenav>
  );
}
