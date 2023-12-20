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
import React from "react";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const { auth } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure()
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
        <Flex flexWrap="wrap" alignContent="flex-start" justify="space-between" className="job-post-wrapper" flex="1" w="100%" padding="50px 40px 50px">

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
