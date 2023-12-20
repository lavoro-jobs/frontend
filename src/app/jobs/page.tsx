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
import { FaMoneyBillWave } from "react-icons/fa";
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
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
      const fetchJobPosts = async () => {
        try {
          const data = await getAllJobPosts(30);
          console.log(data)
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

          <Flex flexWrap="wrap" alignContent="flex-start" justify="space-between" className="job-post-wrapper" flex="1" w="100%" padding="150px 40px 100px">



              <Flex direction="column" h="100%">
                <Card w="sm" h="100%" display="flex" color={"black"} backgroundColor={"white"} flexDirection="column">
                  <CardBody flex="1" display="flex" flexDirection="column">
                    <Heading marginBottom="30px">Fullstack developer</Heading>
                    <Flex flexWrap="wrap">
                      <Text
                        display="inline-block"
                        px="2"
                        py="1"
                        mr="2"
                        mb="2"
                        borderRadius="md"
                        backgroundColor="blue.500"
                        color="white"
                      >
                        Java
                      </Text>
                      <Text
                          display="inline-block"
                          px="2"
                          py="1"
                          mr="2"
                          mb="2"
                          borderRadius="md"
                          backgroundColor="blue.500"
                          color="white"
                        >
                          Angular
                        </Text>
                    </Flex>
                    <Flex mt="8px" align="center" gap="8px">
                      <FaGraduationCap size="24px" />
                      <Text>Bachelor - Incomplete</Text>
                    </Flex>
                    <Flex mt="8px" align="center" gap="8px">
                      <LiaCertificateSolid size="24px" />
                      <Text>Seniority level - 3</Text>
                    </Flex>
                    <Flex mt="8px" align="center" gap="8px">
                      <FaLocationDot size="24px" />
                      <Text>Hybrid</Text>
                    </Flex>
                    <Flex mt="8px" align="center" gap="8px">
                      <IoBriefcaseSharp size="24px" />
                      <Text>Full time</Text>
                    </Flex>
                    <Flex mt="8px" align="center" gap="8px">
                      <FaMoneyBillWave size="24px" />
                      <Text>
                        $2000 <span> monthly</span>
                      </Text>
                    </Flex>
                  </CardBody>
                  <Divider color="#2E77AE" />
                  <CardFooter alignSelf="flex-end">
                    <ButtonGroup spacing="2">
                        <Button variant="ghost" colorScheme="blue" onClick={onOpen}>
                          See more
                        </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Flex>
              <Flex direction="column" h="100%">
                  <Card w="sm" h="100%" display="flex" color={"black"} backgroundColor={"white"} flexDirection="column">
                    <CardBody flex="1" display="flex" flexDirection="column">
                      <Heading marginBottom="30px">Frontend developer</Heading>
                      <Flex flexWrap="wrap">
                        <Text
                          display="inline-block"
                          px="2"
                          py="1"
                          mr="2"
                          mb="2"
                          borderRadius="md"
                          backgroundColor="blue.500"
                          color="white"
                        >
                          Angular
                        </Text>
                        <Text
                            display="inline-block"
                            px="2"
                            py="1"
                            mr="2"
                            mb="2"
                            borderRadius="md"
                            backgroundColor="blue.500"
                            color="white"
                          >
                            HTML
                          </Text>
                        <Text
                            display="inline-block"
                            px="2"
                            py="1"
                            mr="2"
                            mb="2"
                            borderRadius="md"
                            backgroundColor="blue.500"
                            color="white"
                          >
                            CSS
                          </Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaGraduationCap size="24px" />
                        <Text>Bachelor - Incomplete</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <LiaCertificateSolid size="24px" />
                        <Text>Seniority level - 3</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaLocationDot size="24px" />
                        <Text>Hybrid</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <IoBriefcaseSharp size="24px" />
                        <Text>Full time</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaMoneyBillWave size="24px" />
                        <Text>
                          $3000 <span> monthly</span>
                        </Text>
                      </Flex>
                    </CardBody>
                    <Divider color="#2E77AE" />
                    <CardFooter alignSelf="flex-end">
                      <ButtonGroup spacing="2">
                          <Button variant="ghost" colorScheme="blue" onClick={onOpen}>
                            See more
                          </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
              </Flex>
              <Flex direction="column" h="100%">
                  <Card w="sm" h="100%" display="flex" color={"black"} backgroundColor={"white"} flexDirection="column">
                    <CardBody flex="1" display="flex" flexDirection="column">
                      <Heading marginBottom="30px">Backend developer</Heading>
                      <Flex flexWrap="wrap">
                        <Text
                          display="inline-block"
                          px="2"
                          py="1"
                          mr="2"
                          mb="2"
                          borderRadius="md"
                          backgroundColor="blue.500"
                          color="white"
                        >
                          Java
                        </Text>
                        <Text
                            display="inline-block"
                            px="2"
                            py="1"
                            mr="2"
                            mb="2"
                            borderRadius="md"
                            backgroundColor="blue.500"
                            color="white"
                          >
                            MySQL
                          </Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaGraduationCap size="24px" />
                        <Text>Bachelor - Incomplete</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <LiaCertificateSolid size="24px" />
                        <Text>Seniority level - 1</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaLocationDot size="24px" />
                        <Text>Hybrid</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <IoBriefcaseSharp size="24px" />
                        <Text>Full time</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaMoneyBillWave size="24px" />
                        <Text>
                          $1200 <span> monthly</span>
                        </Text>
                      </Flex>
                    </CardBody>
                    <Divider color="#2E77AE" />
                    <CardFooter alignSelf="flex-end">
                      <ButtonGroup spacing="2">
                          <Button variant="ghost" colorScheme="blue" onClick={onOpen}>
                            See more
                          </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
              </Flex>
<Flex direction="column" h="100%">
                  <Card w="sm" h="100%" display="flex" color={"black"} backgroundColor={"white"} flexDirection="column">
                    <CardBody flex="1" display="flex" flexDirection="column">
                      <Heading marginBottom="30px">Frontend developer</Heading>
                      <Flex flexWrap="wrap">
                        <Text
                          display="inline-block"
                          px="2"
                          py="1"
                          mr="2"
                          mb="2"
                          borderRadius="md"
                          backgroundColor="blue.500"
                          color="white"
                        >
                          Angular
                        </Text>
                        <Text
                            display="inline-block"
                            px="2"
                            py="1"
                            mr="2"
                            mb="2"
                            borderRadius="md"
                            backgroundColor="blue.500"
                            color="white"
                          >
                            HTML
                          </Text>
                        <Text
                            display="inline-block"
                            px="2"
                            py="1"
                            mr="2"
                            mb="2"
                            borderRadius="md"
                            backgroundColor="blue.500"
                            color="white"
                          >
                            CSS
                          </Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaGraduationCap size="24px" />
                        <Text>Bachelor - Incomplete</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <LiaCertificateSolid size="24px" />
                        <Text>Seniority level - 4</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaLocationDot size="24px" />
                        <Text>Hybrid</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <IoBriefcaseSharp size="24px" />
                        <Text>Full time</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaMoneyBillWave size="24px" />
                        <Text>
                          $2400 <span> monthly</span>
                        </Text>
                      </Flex>
                    </CardBody>
                    <Divider color="#2E77AE" />
                    <CardFooter alignSelf="flex-end">
                      <ButtonGroup spacing="2">
                          <Button variant="ghost" colorScheme="blue" onClick={onOpen}>
                            See more
                          </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
              </Flex>
              <Flex direction="column" h="100%">
                  <Card w="sm" h="100%" display="flex" color={"black"} backgroundColor={"white"} flexDirection="column">
                    <CardBody flex="1" display="flex" flexDirection="column">
                      <Heading marginBottom="30px">Backend developer</Heading>
                      <Flex flexWrap="wrap">
                        <Text
                          display="inline-block"
                          px="2"
                          py="1"
                          mr="2"
                          mb="2"
                          borderRadius="md"
                          backgroundColor="blue.500"
                          color="white"
                        >
                          Java
                        </Text>
                        <Text
                            display="inline-block"
                            px="2"
                            py="1"
                            mr="2"
                            mb="2"
                            borderRadius="md"
                            backgroundColor="blue.500"
                            color="white"
                          >
                            MySQL
                          </Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaGraduationCap size="24px" />
                        <Text>Bachelor - Incomplete</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <LiaCertificateSolid size="24px" />
                        <Text>Seniority level - 2</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaLocationDot size="24px" />
                        <Text>Hybrid</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <IoBriefcaseSharp size="24px" />
                        <Text>Full time</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaMoneyBillWave size="24px" />
                        <Text>
                          $1700 <span> monthly</span>
                        </Text>
                      </Flex>
                    </CardBody>
                    <Divider color="#2E77AE" />
                    <CardFooter alignSelf="flex-end">
                      <ButtonGroup spacing="2">
                          <Button variant="ghost" colorScheme="blue" onClick={onOpen}>
                            See more
                          </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
              </Flex>
<Flex direction="column" h="100%">
                  <Card w="sm" h="100%" display="flex" color={"black"} backgroundColor={"white"} flexDirection="column">
                    <CardBody flex="1" display="flex" flexDirection="column">
                      <Heading marginBottom="30px">Frontend developer</Heading>
                      <Flex flexWrap="wrap">
                        <Text
                          display="inline-block"
                          px="2"
                          py="1"
                          mr="2"
                          mb="2"
                          borderRadius="md"
                          backgroundColor="blue.500"
                          color="white"
                        >
                          Angular
                        </Text>
                        <Text
                            display="inline-block"
                            px="2"
                            py="1"
                            mr="2"
                            mb="2"
                            borderRadius="md"
                            backgroundColor="blue.500"
                            color="white"
                          >
                            HTML
                          </Text>
                        <Text
                            display="inline-block"
                            px="2"
                            py="1"
                            mr="2"
                            mb="2"
                            borderRadius="md"
                            backgroundColor="blue.500"
                            color="white"
                          >
                            CSS
                          </Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaGraduationCap size="24px" />
                        <Text>Bachelor - Incomplete</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <LiaCertificateSolid size="24px" />
                        <Text>Seniority level - 3</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaLocationDot size="24px" />
                        <Text>Hybrid</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <IoBriefcaseSharp size="24px" />
                        <Text>Full time</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaMoneyBillWave size="24px" />
                        <Text>
                          $3000 <span> monthly</span>
                        </Text>
                      </Flex>
                    </CardBody>
                    <Divider color="#2E77AE" />
                    <CardFooter alignSelf="flex-end">
                      <ButtonGroup spacing="2">
                          <Button variant="ghost" colorScheme="blue" onClick={onOpen}>
                            See more
                          </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
              </Flex>
              <Flex direction="column" h="100%">
                  <Card w="sm" h="100%" display="flex" color={"black"} backgroundColor={"white"} flexDirection="column">
                    <CardBody flex="1" display="flex" flexDirection="column">
                      <Heading marginBottom="30px">Backend developer</Heading>
                      <Flex flexWrap="wrap">
                        <Text
                          display="inline-block"
                          px="2"
                          py="1"
                          mr="2"
                          mb="2"
                          borderRadius="md"
                          backgroundColor="blue.500"
                          color="white"
                        >
                          Java
                        </Text>
                        <Text
                            display="inline-block"
                            px="2"
                            py="1"
                            mr="2"
                            mb="2"
                            borderRadius="md"
                            backgroundColor="blue.500"
                            color="white"
                          >
                            MySQL
                          </Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaGraduationCap size="24px" />
                        <Text>Bachelor - Incomplete</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <LiaCertificateSolid size="24px" />
                        <Text>Seniority level - 3</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaLocationDot size="24px" />
                        <Text>Hybrid</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <IoBriefcaseSharp size="24px" />
                        <Text>Full time</Text>
                      </Flex>
                      <Flex mt="8px" align="center" gap="8px">
                        <FaMoneyBillWave size="24px" />
                        <Text>
                          $2600 <span> monthly</span>
                        </Text>
                      </Flex>
                    </CardBody>
                    <Divider color="#2E77AE" />
                    <CardFooter alignSelf="flex-end">
                      <ButtonGroup spacing="2">
                          <Button variant="ghost" colorScheme="blue" onClick={onOpen}>
                            See more
                          </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
              </Flex>
              <div></div>
              <div></div>
              <div></div>


          </Flex>












            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                      <Flex direction="column" h="100%" padding="60px 32px 32px">

                              <Heading className="modal-heading" marginBottom="30px">Fullstack developer</Heading>
                              <Flex flexWrap="wrap">
                                <Text
                                  display="inline-block"
                                  px="2"
                                  py="1"
                                  mr="2"
                                  mb="2"
                                  borderRadius="md"
                                  backgroundColor="blue.500"
                                  color="white"
                                >
                                  Java
                                </Text>
                                <Text
                                    display="inline-block"
                                    px="2"
                                    py="1"
                                    mr="2"
                                    mb="2"
                                    borderRadius="md"
                                    backgroundColor="blue.500"
                                    color="white"
                                  >
                                    Angular
                                  </Text>
                              </Flex>
                              <Flex mt="8px" align="center" gap="8px">
                                <FaGraduationCap size="24px" />
                                <Text>Bachelor - Incomplete</Text>
                              </Flex>
                              <Flex mt="8px" align="center" gap="8px">
                                <LiaCertificateSolid size="24px" />
                                <Text>Seniority level - 3</Text>
                              </Flex>
                              <Flex mt="8px" align="center" gap="8px">
                                <FaLocationDot size="24px" />
                                <Text>Hybrid</Text>
                              </Flex>
                              <Flex mt="8px" align="center" gap="8px">
                                <IoBriefcaseSharp size="24px" />
                                <Text>Full time</Text>
                              </Flex>
                              <Flex mt="8px" align="center" gap="8px">
                                <FaMoneyBillWave size="24px" />
                                <Text>
                                  $2000 <span> monthly</span>
                                </Text>
                              </Flex>
                              <Flex mt="24px" gap="8px">
                                <Text className="job-post-description">
                                  <h3>Job Description:</h3>
                                  We're on the lookout for a skilled Fullstack Developer proficient in Java and Angular to bolster our team. In this role, you'll take charge of developing, enhancing, and maintaining both front-end and back-end components of our applications. Your expertise in Java will be crucial for building robust, scalable server-side systems while leveraging Angular to craft dynamic, user-centric interfaces. Collaboration with cross-functional teams will be key in delivering top-notch software solutions. Your responsibilities also include implementing best practices, contributing to architectural decisions, and troubleshooting to optimize application performance. Our hybrid work model allows flexibility between remote and onsite collaboration, fostering a dynamic work environment.
                                  <br/><br/>
                                  <h3>Requirements:</h3>
                                  You should possess an incomplete Bachelor's degree in Computer Science or a related field, coupled with a proven track record as a Fullstack Developer, showcasing proficiency in Java and Angular at a Seniority Level 3. A deep understanding of both front-end and back-end technologies, along with experience in RESTful APIs, microservices architecture, and database management systems, is essential. Your familiarity with version control systems like Git, problem-solving prowess, and ability to excel in a fast-paced, collaborative environment are critical. Effective communication skills, Agile methodology experience, and an innate drive for continuous learning and improvement round out our expectations.
                                  <br/><br/>
                                  Join us in creating innovative solutions! Bring your expertise and creativity to a team that values Fullstack development mastery.
                                </Text>
                              </Flex>
                        </Flex>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
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
