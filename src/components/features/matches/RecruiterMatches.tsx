import React, { useEffect, useRef, useState } from "react";
import Sidenav from "../dashboard/Sidenav";
import FormState from "@/interfaces/job-posts/form-state.interface";
import getJobPostsByRecruiter from "@/helpers/getJobPosts";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import getApplicationsByJobPost from "@/helpers/getApplicantionsByJobPost";
import FormStateApplication from "@/interfaces/matches/form-state-application.interface";
import { FaCheck, FaFileDownload, FaGenderless, FaGraduationCap, FaMoneyBillWave } from "react-icons/fa";
import { LiaBirthdayCakeSolid, LiaCertificateSolid } from "react-icons/lia";
import { FaLocationDot } from "react-icons/fa6";
import { IoBriefcaseSharp, IoFemaleSharp, IoMaleSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { TfiCommentAlt } from "react-icons/tfi";
import { CgMoreO } from "react-icons/cg";
import FormStateComment from "@/interfaces/matches/form-state-comment.interface";
import getComments from "@/helpers/getComments";
import commentApplication from "@/helpers/commentApplication";
import SmallAddress from "@/components/shared/Address";
import dynamic from "next/dynamic";
import approveApplication from "@/helpers/approveApplication";
import rejectApplication from "@/helpers/rejectApplication";
import deleteComment from "@/helpers/deleteComment";
import RecruiterState from "@/interfaces/recruiter/form-state-get-recruiter.interface";
import getRecruiterProfile from "@/helpers/getRecruiterProfile";
import createPrivateChat from "@/helpers/createChat";

export default function RecruiterMatches() {
  const [jobPosts, setJobPosts] = useState<FormState[]>([]);
  const [applications, setApplications] = useState<{ [key: string]: FormStateApplication[] }>({});
  const [comments, setComments] = useState<FormStateComment[]>();
  const [comment, setComment] = useState({ comment_body: "" });
  const [recruiter, setRecruiter] = useState<RecruiterState>();

  const [postId, setPostId] = useState<string>("");
  const [accId, setAccId] = useState<string>("");

  const { isOpen: isCommentsModalOpen, onOpen: onCommentsModalOpen, onClose: onCommentsModalClose } = useDisclosure();
  const { isOpen: isMoreModalOpen, onOpen: onMoreModalOpen, onClose: onMoreModalClose } = useDisclosure();
  const SmallAddress = dynamic(() => import("../../shared/SmallAddress"), { ssr: false });
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobPostsData = await getJobPostsByRecruiter();
        setJobPosts(jobPostsData);

        const jobPostIds = jobPostsData.map((jobPost: FormState) => jobPost.id);

        const applicationsData = await Promise.all(jobPostIds.map((id: string) => getApplicationsByJobPost(id)));

        const applicationsByJobPost: { [key: string]: FormStateApplication[] } = {};
        jobPostIds.forEach((id: string, index: number) => {
          applicationsByJobPost[id] = applicationsData[index];
        });

        setApplications(applicationsByJobPost);

        const recruiterProfile = await getRecruiterProfile();
        setRecruiter(recruiterProfile);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const fetchComments = async (jobPostId: string | undefined, applicantId: string | undefined) => {
    if (jobPostId && applicantId) {
      try {
        const comments = await getComments(jobPostId, applicantId);
        setComments(comments);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    }
  };

  const deleteComm = async (commentId: string | undefined) => {
    if (postId && commentId) {
      try {
        const comments = await deleteComment(postId, commentId);
        fetchComments(postId, accId);
      } catch (error) {
        console.error("Failed to delete comment", error);
      }
    }
  };

  const reject = async (jobPostId: string | undefined, applicantId: string | undefined) => {
    if (jobPostId && applicantId) {
      try {
        const response = await rejectApplication(jobPostId, applicantId);
        if (response == 200) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Failed to reject application", error);
      }
    }
  };

  const approve = (
    jobPostId: string | undefined,
    applicantId: string | undefined,
    applicantChatToken: string | undefined,
    first_name: string | undefined,
    last_name: string | undefined,
    assigneesTokens: string[]
  ) => {
    if (jobPostId && applicantId) {
      try {
        approveApplication(jobPostId, applicantId);
        createPrivateChat(applicantChatToken, first_name, last_name, assigneesTokens);
      } catch (error) {
        console.error("Failed to approve application", error);
      }
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && postId && accId) {
      e.preventDefault();
      commentApplication(comment, postId, accId);
      setComment({ ...comment, comment_body: "" });
      fetchComments(postId, accId);
      fetchComments(postId, accId);
    }
  };

  const downloadFile = (cv: string) => {
    const linkSource = `data:application/pdf;base64,${cv}`;
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = linkSource;
      downloadLinkRef.current.download = "cv";
    }
  };

  const allApplications = Object.values(applications).flatMap((appArray) => appArray);

  return (
    <Sidenav>
      <Flex direction="column" align="center" gap="32px">
        {jobPosts.map(
          (jobPost, index) =>
            allApplications.filter(
              (application) => application.job_post_id === jobPost.id && application.approved_by_company == null
            ).length > 0 && (
              <Card w={{ base: "400px", xl: "800px" }} key={index}>
                <CardHeader w="100%" bg="#2E77AE">
                  <Heading textAlign="center" color="white">
                    {jobPost.position?.position_name}
                  </Heading>
                </CardHeader>
                <Flex w="100%" justify="center" wrap="wrap" p="32px" gap="16px">
                  {allApplications.map(
                    (application, ind) =>
                      application.job_post_id == jobPost.id && (
                        <>
                          <Flex direction="column" w="360px" key={ind}>
                            <Flex
                              direction="column"
                              align="center"
                              border="solid 2px #E0EAF5"
                              borderTopRightRadius="16px"
                              borderTopLeftRadius="16px"
                              bg="#E0EAF5"
                              p="16px"
                              gap="8px"
                            >
                              <Avatar
                                src="https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                                size="2xl"
                              />
                              <Heading size="lg">
                                {application.applicant.first_name} {application.applicant.last_name}
                              </Heading>
                            </Flex>
                            <Flex direction="column" align="center" border="solid 2px #E0EAF5" p="16px" gap="8px">
                              <Heading size="lg">{application.applicant.position.position_name}</Heading>
                              <div>
                                {application.applicant.skills &&
                                  application.applicant.skills.map((skill, index) => (
                                    <Text
                                      key={index}
                                      display="inline-block"
                                      p="4px"
                                      m="4px"
                                      borderRadius="lg"
                                      backgroundColor="#2E77AE"
                                      color="white"
                                    >
                                      {skill.skill_name}
                                    </Text>
                                  ))}
                              </div>
                              <Flex mt="16px" align="center" gap="8px">
                                <FaGraduationCap size="24px" />
                                <Text>{application.applicant.education_level.education_level}</Text>
                              </Flex>
                              <Flex mt="8px" align="center" gap="8px">
                                <LiaCertificateSolid size="24px" />
                                <Text>Seniority level - {application.applicant.seniority_level}</Text>
                              </Flex>
                              <Flex mt="8px" align="center" gap="8px">
                                <FaLocationDot size="24px" />
                                <Text>{application.applicant.work_type.work_type}</Text>
                              </Flex>
                              <Flex mt="8px" align="center" gap="8px">
                                <IoBriefcaseSharp size="24px" />
                                <Text>{application.applicant.contract_type.contract_type}</Text>
                              </Flex>

                              <Divider mt="8px" />

                              <Flex gap="16px">
                                <Button
                                  onClick={() => {
                                    onCommentsModalOpen();
                                    setAccId(application.applicant_account_id || "");
                                    setPostId(jobPost.id || "");
                                    fetchComments(jobPost.id, application.applicant_account_id);
                                  }}
                                  variant="ghost"
                                  _hover={{ bg: "white", color: "#2E77AE" }}
                                >
                                  <Flex mt="8px" align="center" gap="8px">
                                    <TfiCommentAlt size="16px" />
                                    <Text>Comment</Text>
                                  </Flex>
                                </Button>
                                <Button
                                  onClick={onMoreModalOpen}
                                  variant="ghost"
                                  _hover={{ bg: "white", color: "#2E77AE" }}
                                >
                                  <Flex mt="8px" align="center" gap="8px">
                                    <CgMoreO size="16px" />
                                    <Text>See more</Text>
                                  </Flex>
                                </Button>
                              </Flex>

                              <Divider mt="8px" />

                              <Flex mt="8px" gap="16px">
                                <Button
                                  size="lg"
                                  borderRadius="50%"
                                  colorScheme="red"
                                  onClick={() => reject(jobPost.id, application.applicant_account_id)}
                                >
                                  <ImCross />
                                </Button>
                                <Button
                                  size="lg"
                                  borderRadius="50%"
                                  colorScheme="green"
                                  onClick={() =>
                                    approve(
                                      jobPost.id,
                                      application.applicant_account_id,
                                      application.applicant_stream_chat_token,
                                      application.applicant.first_name,
                                      application.applicant.last_name,
                                      application.assignees_stream_chat_tokens
                                    )
                                  }
                                >
                                  <FaCheck />
                                </Button>
                              </Flex>
                            </Flex>

                            <Modal
                              isOpen={isCommentsModalOpen}
                              onClose={onCommentsModalClose}
                              size="xl"
                              isCentered={true}
                            >
                              <ModalOverlay />
                              <ModalContent>
                                <ModalHeader>
                                  <Heading w="484px" size="lg">
                                    {application.applicant.first_name} {application.applicant.last_name}
                                  </Heading>
                                  <Text fontSize="sm" color="gray.500">
                                    {comments?.length} comments
                                  </Text>
                                </ModalHeader>

                                <ModalBody mt="80px">
                                  <Flex align="center" gap="8px">
                                    <Avatar size="sm" />
                                    <Input
                                      size="sm"
                                      borderRadius="50px"
                                      value={comment.comment_body}
                                      onChange={(e) => setComment({ ...comment, comment_body: e.target.value })}
                                      onKeyDown={(e) => {
                                        handleKeyDown(e);
                                      }}
                                      placeholder="Add a comment..."
                                    />
                                  </Flex>

                                  {comments?.map((comment) => (
                                    <Flex
                                      direction="column"
                                      mt="16px"
                                      gap="8px"
                                      bg="#E0EAF5"
                                      borderRadius="8px"
                                      p="8px"
                                    >
                                      <Flex justify="space-between">
                                        <Flex gap="8px" align="center">
                                          <Avatar size="sm" />
                                          <Flex direction="column">
                                            <Text fontSize="lg">
                                              <strong>
                                                {comment.recruiter?.first_name} {comment.recruiter?.last_name}
                                              </strong>
                                            </Text>
                                            <Text fontSize="sm" color="gray.500">
                                              {comment.created_on_date?.split("T")[0] +
                                                " " +
                                                comment.created_on_date?.split("T")[1].split(".")[0]}
                                            </Text>
                                          </Flex>
                                        </Flex>
                                        {recruiter?.account_id == comment.recruiter?.account_id && (
                                          <Button
                                            variant="ghost"
                                            _hover={{ color: "red", bg: "#E0EAF5" }}
                                            onClick={() => deleteComm(comment.id)}
                                          >
                                            X
                                          </Button>
                                        )}
                                      </Flex>
                                      <Text w="464px">{comment.comment_body}</Text>
                                    </Flex>
                                  ))}
                                </ModalBody>

                                <ModalFooter>
                                  <Button colorScheme="blue" onClick={onCommentsModalClose}>
                                    Close
                                  </Button>
                                </ModalFooter>
                              </ModalContent>
                            </Modal>

                            <Modal isOpen={isMoreModalOpen} onClose={onMoreModalClose} size="xl" isCentered={true}>
                              <ModalOverlay />
                              <ModalContent>
                                <ModalHeader>
                                  <Heading textAlign="center" size="lg">
                                    {application.applicant.first_name} {application.applicant.last_name}
                                  </Heading>
                                </ModalHeader>

                                <ModalBody mt="64px">
                                  <Flex
                                    w={{ base: "auto", lg: "484px" }}
                                    justify="center"
                                    mt="4px"
                                    gap="8px"
                                    align="center"
                                  >
                                    <LiaBirthdayCakeSolid size="20px" />
                                    <Text>{application.applicant.age} years old, </Text>
                                    {application.applicant.gender == "male" && (
                                      <>
                                        <IoMaleSharp size="18px" />
                                        <Text>Male</Text>
                                      </>
                                    )}
                                    {application.applicant.gender == "female" && (
                                      <>
                                        <IoFemaleSharp size="18px" />
                                        <Text>Female</Text>
                                      </>
                                    )}
                                    {application.applicant.gender == "other" && (
                                      <>
                                        <FaGenderless size="18px" />
                                        <Text>Other</Text>
                                      </>
                                    )}
                                  </Flex>

                                  <Flex justify="center">
                                    <SmallAddress
                                      lat={application.applicant.home_location.latitude}
                                      long={application.applicant.home_location.longitude}
                                    ></SmallAddress>
                                    <Text mt="8px">
                                      , max distance: {application.applicant.work_location_max_distance}km
                                    </Text>
                                  </Flex>

                                  <Flex justify="center" color="#2E77AE" mt="16px" align="center" gap="8px">
                                    <FaFileDownload size="24px" />
                                    <a ref={downloadLinkRef} onClick={() => downloadFile(application.applicant.cv)}>
                                      Download CV
                                    </a>
                                  </Flex>

                                  <Flex justify="center" mt="16px" gap="8px" align="center">
                                    <FaMoneyBillWave size="18px" />
                                    <Text>Min salary: {application.applicant.min_salary}€</Text>
                                  </Flex>

                                  {application.applicant.experiences.length > 0 && (
                                    <Box mt="16px" mb="16px" border="1px solid #2E77AE" />
                                  )}

                                  {application.applicant.experiences.length > 0 && (
                                    <Text textAlign="center" fontSize="xl" pb="16px" color="#2E77AE">
                                      <strong>WORK EXPERIENCES</strong>
                                    </Text>
                                  )}

                                  {application.applicant.experiences.map((experience, index) => (
                                    <>
                                      <Text align="center" mb="8px" key={index}>
                                        Company name - {experience.company_name}
                                      </Text>
                                      <Text align="center" mb="8px" key={index}>
                                        Position - {experience.position?.position_name}
                                      </Text>
                                      <Text align="center" mb="16px" key={index}>
                                        Years - {experience.years}
                                      </Text>
                                    </>
                                  ))}

                                  {application.applicant.experiences.length > 0 && <Box border="1px solid #2E77AE" />}
                                </ModalBody>

                                <ModalFooter>
                                  <Button colorScheme="blue" onClick={onMoreModalClose}>
                                    Close
                                  </Button>
                                </ModalFooter>
                              </ModalContent>
                            </Modal>
                          </Flex>
                        </>
                      )
                  )}
                </Flex>
              </Card>
            )
        )}
      </Flex>
    </Sidenav>
  );
}
