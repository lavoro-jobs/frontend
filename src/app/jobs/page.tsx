"use client";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaMoneyBillWave, FaBuilding } from "react-icons/fa";
import { IoBriefcaseSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import FormState from "@/interfaces/job-posts/form-state.interface";
import JobPost from "@/components/features/jobPost/JobPost";
import getAllJobPosts from "@/helpers/getAllJobPosts";

export default function Jobs() {
  const [jobPosts, setJobPosts] = useState<FormState[]>([]);
  const [modalJob, setModalJob] = useState<FormState>({});
  const { isOpen, onOpen, onClose } = useDisclosure()

  const triggerModal = (index) => {
    setModalJob(jobPosts.at(index));
    onOpen();
  };

  useEffect(() => {
      const fetchJobPosts = async () => {
        try {
          const data = await getAllJobPosts(30);
          setJobPosts(data);
        } catch (error) {
          console.error("Failed to fetch job posts", error);
        }
      };

      fetchJobPosts();
  }, []);

  return (
    <>
      <Flex flexFlow="column" minHeight="100vh">
        <Header />
        { !jobPosts.length &&
        <Flex className="job-post-wrapper" flex="1" w="100%" className="homepage-jobs-wrapper">
          <h3 fontWeight="bold" fontSize="xl" margin="24px auto 0">There are currently no jobs.</h3>
        </Flex>
        }
        { !!jobPosts.length &&
        <Flex flexWrap="wrap" alignContent="flex-start" justify="space-between" className="job-post-wrapper" flex="1" w="100%" padding="150px 40px 100px">
          { jobPosts.map((jobPost, index) => (
            <Flex key={index} direction="column" h="100%">
              <Card w="sm" h="100%" display="flex" color={"black"} backgroundColor={"white"} flexDirection="column">
                <CardBody flex="1" display="flex" flexDirection="column">
                  <Heading marginBottom="30px">{jobPost.position.position_name}</Heading>
                  <Flex flexWrap="wrap">
                    {jobPost.skills && jobPost.skills.map((skill, i) => (
                      <Text
                        key={i}
                        display="inline-block"
                        px="2"
                        py="1"
                        mr="2"
                        mb="2"
                        borderRadius="md"
                        backgroundColor="blue.500"
                        color="white"
                      >
                        { skill.skill_name }
                      </Text>
                    ))}
                  </Flex>
                  <Flex mt="8px" align="center" gap="8px">
                    <FaGraduationCap size="24px" />
                    <Text>{jobPost.education_level.education_level}</Text>
                  </Flex>
                  <Flex mt="8px" align="center" gap="8px">
                    <LiaCertificateSolid size="24px" />
                    <Text>Seniority level - {jobPost.seniority_level}</Text>
                  </Flex>
                  <Flex mt="8px" align="center" gap="8px">
                    <FaLocationDot size="24px" />
                    <Text>{jobPost.work_type.work_type}</Text>
                  </Flex>
                  <Flex mt="8px" align="center" gap="8px">
                    <IoBriefcaseSharp size="24px" />
                    <Text>{jobPost.contract_type.contract_type}</Text>
                  </Flex>
                  <Flex mt="8px" align="center" gap="8px">
                    <FaMoneyBillWave size="24px" />
                    <Text>
                      {jobPost.salary_min && <span>${jobPost.salary_min}</span>} {jobPost.salary_max && <span>- ${jobPost.salary_max}</span>}
                    </Text>
                  </Flex>
                </CardBody>
                  <Divider color="#2E77AE" />
                  <CardFooter alignSelf="flex-end">
                    <ButtonGroup spacing="2">
                        <Button variant="ghost" colorScheme="blue" onClick={() => triggerModal(index)}>
                          See more
                        </Button>
                    </ButtonGroup>
                  </CardFooter>
              </Card>
            </Flex>
          ))}
          <Flex></Flex>
          <Flex></Flex>
          <Flex></Flex>
        </Flex>
        }
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody className="modalCard">
                { modalJob.id &&
                <Flex direction="column" h="100%" padding="60px 16px 32px">
                    <Heading marginBottom="0px">{modalJob.position.position_name}</Heading>

                    <Flex mt="24px" gap="8px" flexDirection="column">
                      <Flex w="100%" className="job-post-description">
                        <h3>Company:</h3>
                      </Flex>
                    </Flex>
                    <Flex mt="8px" align="center" gap="8px">
                      <FaBuilding size="24px" />
                      <Text>{modalJob.company.name}</Text>
                    </Flex>
                    <Flex mt="24px" gap="8px" flexDirection="column">
                      <Flex w="100%" className="job-post-description">
                        <h3>Offer & Requirements:</h3>
                      </Flex>
                    </Flex>
                    <Flex flexWrap="wrap">
                      {modalJob.skills && modalJob.skills.map((skill, i) => (
                        <Text
                          key={i}
                          display="inline-block"
                          px="2"
                          py="1"
                          mr="2"
                          mb="2"
                          borderRadius="md"
                          backgroundColor="blue.500"
                          color="white"
                        >
                          { skill.skill_name }
                        </Text>
                      ))}
                    </Flex>
                    <Flex mt="8px" align="center" gap="8px">
                      <FaGraduationCap size="24px" />
                      <Text>{modalJob.education_level.education_level}</Text>
                    </Flex>
                    <Flex mt="8px" align="center" gap="8px">
                      <LiaCertificateSolid size="24px" />
                      <Text>Seniority level - {modalJob.seniority_level}</Text>
                    </Flex>
                    <Flex mt="8px" align="center" gap="8px">
                      <FaLocationDot size="24px" />
                      <Text>{modalJob.work_type.work_type}</Text>
                    </Flex>
                    <Flex mt="8px" align="center" gap="8px">
                      <IoBriefcaseSharp size="24px" />
                      <Text>{modalJob.contract_type.contract_type}</Text>
                    </Flex>
                    <Flex mt="8px" align="center" gap="8px">
                      <FaMoneyBillWave size="24px" />
                      <Text>
                        {modalJob.salary_min && <span>${modalJob.salary_min}</span>} {modalJob.salary_max && <span>- ${modalJob.salary_max}</span>}
                      </Text>
                    </Flex>
                    <Flex mt="24px" gap="8px" flexDirection="column">
                      <Flex w="100%" className="job-post-description">
                        <h3>Job Description:</h3>
                      </Flex>
                      <Text className="job-post-description">
                        {modalJob.description}
                      </Text>
                    </Flex>
                </Flex>
                }
              </ModalBody>

              <ModalFooter>
                <Text marginBottom="16px" marginLeft="16px" marginRight="auto" className="job-post-description">
                  Active until: {modalJob.end_date && new Date(modalJob.end_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
                <Button colorScheme='blue' marginBottom="16px" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Footer />
      </Flex>
    </>
  );
}
