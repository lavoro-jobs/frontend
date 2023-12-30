import React, { useEffect, useState } from "react";
import Sidenav from "../dashboard/Sidenav";
import getApplicantMatches from "@/helpers/getApplicantMatches";
import {
  Alert, AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import FormState from "@/interfaces/matches/form-state-applicant-matches.interface";
import dynamic from "next/dynamic";
import { FaCheck, FaGraduationCap, FaMoneyBillWave } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { LiaCertificateSolid } from "react-icons/lia";
import { IoBriefcaseSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import acceptMatch from "@/helpers/acceptMatch";
import rejectMatch from "@/helpers/rejectMatch";

export default function ApplicantMatches() {
  const [formData, setFormData] = useState<FormState[]>();
  const Address = dynamic(() => import("../../shared/Address"), { ssr: false });
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    getApplicantMatches().then((resp) => {
      resp.sort((a: any, b: any) => b.match_score - a.match_score);
      setFormData(resp);
    });
  }, []);

  const handleMatchAction = async (jobPostId: string | undefined, matchActionFunction: (jobPostId: string | undefined) => Promise<number>) => {
    const response = await matchActionFunction(jobPostId);
    if (response !== 200) {
      setAlert(true);
      return;
    }

    const newFormData = formData?.filter((match) => match.job_post?.id !== jobPostId);
    setFormData(newFormData);
  }

  return (
    <Sidenav>
      <Flex w="100%" minHeight="calc(100vh - 32px)">
        <Box w="100%" display="flex" flexDirection="column">
          {alert && (
            <Alert status='error' justifyContent='center' textAlign='center'>
              <AlertIcon />
              There was an error processing your request
            </Alert>
          )}
          <Box bg="#E0EAF5" p="64px" flex="1" display="flex">
            <Flex flexWrap="wrap" gap="48px" justify="center">
              {formData?.map((match, index) => (
                <Card w="800px" key={index}>
                  {match.job_post && (
                    <>
                      <CardHeader backgroundColor="#2E77AE" display="flex" flexDirection="row" gap="32px">
                        <Image
                          w="200px"
                          borderRadius="24px"
                          src={
                            match.job_post.company?.logo
                              ? `data:image/jpeg;base64,${match.job_post.company?.logo}`
                              : "https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/company-enterprise-icon.png"
                          }
                        />
                        <Box color="white">
                          <Heading>{match.job_post.company?.name}</Heading>
                          <Text mt="8px">{match.job_post.company?.description}</Text>
                          <Address
                            lat={match.job_post.work_location?.latitude}
                            long={match.job_post.work_location?.longitude}
                          ></Address>
                        </Box>
                      </CardHeader>
                      <CardBody>
                        <Text fontSize="sm" color="gray">
                          {match.job_post.end_date?.substring(0, 10)}, {match.job_post.end_date?.substring(11, 16)}
                        </Text>
                        <Heading color="#2E77AE">{match.job_post.position?.position_name}</Heading>
                        <Text mt="8px">{match.job_post.description}</Text>
                        <Flex mt="16px" flexWrap="wrap">
                          {match.job_post.skills &&
                            match.job_post.skills.map((skill, index) => (
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
                        </Flex>
                        <Flex mt="16px" align="center" gap="8px">
                          <FaGraduationCap color="#2E77AE" size="24px" />
                          <Text>
                            <strong>{match.job_post.education_level?.education_level}</strong>
                          </Text>
                        </Flex>
                        <Flex mt="8px" align="center" gap="8px">
                          <LiaCertificateSolid color="#2E77AE" size="24px" />
                          <Text>
                            <strong>Seniority level - {match.job_post.seniority_level}</strong>
                          </Text>
                        </Flex>
                        <Flex mt="8px" align="center" gap="8px">
                          <FaLocationDot color="#2E77AE" size="24px" />
                          <Text>
                            <strong>{match.job_post.work_type?.work_type}</strong>
                          </Text>
                        </Flex>
                        <Flex mt="8px" align="center" gap="8px">
                          <IoBriefcaseSharp color="#2E77AE" size="24px" />
                          <Text>
                            <strong>{match.job_post.contract_type?.contract_type}</strong>
                          </Text>
                        </Flex>
                        <Flex mt="8px" align="center" gap="8px">
                          <FaMoneyBillWave color="#2E77AE" size="24px" />
                          <Text>
                            <strong>
                              {match.job_post.salary_min !== undefined && match.job_post.salary_max !== undefined
                                ? `$${match.job_post.salary_min} - $${match.job_post.salary_max}`
                                : match.job_post.salary_min !== undefined
                                  ? `From $${match.job_post.salary_min}`
                                  : match.job_post.salary_max !== undefined
                                    ? `Up to $${match.job_post.salary_max}`
                                    : "Salary not specified"}
                              {(match.job_post.contract_type?.id == 1 ||
                                match.job_post.contract_type?.id == 2 ||
                                match.job_post.contract_type?.id == 3) && <span>, hourly</span>}
                              {match.job_post.contract_type?.id == 4 && <span>, monthly</span>}
                            </strong>
                          </Text>
                        </Flex>
                      </CardBody>
                      <Divider color="#2E77AE" />
                      <Flex direction="column" p="20px" display="flex" justify="space-between" align="center">
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color={
                            match.match_score && match.match_score < 0.25
                              ? "#d63031"
                              : match.match_score && match.match_score < 0.5
                                ? "#fdcb6e"
                                : "#16a085"
                          }
                        >
                          Match Score: {match.match_score && match.match_score * 100}%
                        </Text>
                        <Flex mt="16px" gap="16px">
                          <Button size="lg" borderRadius="50%" colorScheme="red" onClick={() => handleMatchAction(match.job_post?.id, rejectMatch)}>
                            <ImCross />
                          </Button>
                          <Button size="lg" borderRadius="50%" colorScheme="green" onClick={() => handleMatchAction(match.job_post?.id, acceptMatch)}>
                            <FaCheck />
                          </Button>
                        </Flex>
                      </Flex>
                    </>
                  )}
                </Card>
              ))}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Sidenav>
  );
}
