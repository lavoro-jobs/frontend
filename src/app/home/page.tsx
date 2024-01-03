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
import useAuth from "@/hooks/useAuth";
import FormState from "@/interfaces/job-posts/form-state.interface";
import getAllJobPosts from "@/helpers/getAllJobPosts";

export default function Home() {
  const [jobPosts, setJobPosts] = useState<FormState[]>([]);
  const [modalJob, setModalJob] = useState<FormState>({});
  const { auth } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const triggerModal = (index) => {
    setModalJob(jobPosts.at(index));
    onOpen();
  };

  useEffect(() => {
      const fetchJobPosts = async () => {
        try {
          const data = await getAllJobPosts(5);
          setJobPosts(data);
        } catch (error) {
          console.error("Failed to fetch job posts", error);
        }
      };

      fetchJobPosts();
  }, []);


  return (
    <>
      <Header />
      <div className="homepage-banner-wrapper">
        <div className="homepage-banner-container">
          <Image alt="banner" src="/assets/images/banner.jpg" width="1000" height="1000" />
          <div className="homepage-banner-box">
            <h1>
              Match your
              <br />
              <span>future</span>
            </h1>
            { !auth &&
            <Button as="a" href="/signup" bgColor="#FF8E2B" _hover={{ bgColor: "#fdb16e" }} color="#0D2137" h="32px">
              Sign up
            </Button>
            }
            { auth &&
            <Button as="a" href="/dashboard" bgColor="#FF8E2B" _hover={{ bgColor: "#fdb16e" }} color="#0D2137" h="32px">
              Dashboard
            </Button>
            }
          </div>
        </div>
      </div>
      <div className="homepage-highlights-wrapper">
        <h2>Matching impact</h2>
        <div className="homepage-highlights-container">
          <div className="homepage-highlights-box">
            <h3>+1.000</h3>
            <p>daily matches</p>
          </div>
          <div className="homepage-highlights-box">
            <h3>+100.000</h3>
            <p>users</p>
          </div>
          <div className="homepage-highlights-box">
            <h3>+10.000</h3>
            <p>recruiters</p>
          </div>
          <div className="homepage-highlights-box">
            <h3>11</h3>
            <p>countries</p>
          </div>
        </div>
      </div>
      <div className="homepage-jobs-wrapper">
        <h2>Our top picks this week</h2>
        { !jobPosts.length && <h3 fontWeight="bold" fontSize="xl" margin="24px auto 0">There are currently no jobs.</h3> }
        <Flex flexWrap="wrap" alignContent="flex-start" justify="space-between" className="job-post-wrapper" flex="1" w="100%" padding="50px 40px 50px">
          { jobPosts && jobPosts.map((jobPost, index) => (
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
      </div>
      <div className="homepage-matching-wrapper">
        <div className="homepage-matching-container">
          <div className="homepage-matching-box">
            <div className="homepage-matching-background">
                <h1>
                  How&nbsp;
                  <br />
                  <span>it works</span>
                </h1>
                <p>
                  See how our ML algorithm
                  <br />
                  shapes your future
                </p>
            </div>
            <Button as="a" href="/signup" bgColor="#FF8E2B" _hover={{ bgColor: "#fdb16e" }} color="#0D2137" h="32px">
              Discover
            </Button>
          </div>
          <Image alt="matching" src="/assets/images/matching.jpg" width="1000" height="1000" />
        </div>
      </div>
      <Footer />
    </>
  );
}
