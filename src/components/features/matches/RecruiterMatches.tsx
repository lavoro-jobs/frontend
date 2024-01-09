import React, { useEffect, useRef, useState } from "react";
import Sidenav from "@/components/features/dashboard/Sidenav";
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
import { TfiPlus, TfiMinus } from "react-icons/tfi";
import { FaPaperclip } from "react-icons/fa";
import { IoBriefcaseSharp, IoFemaleSharp, IoMaleSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { TfiCommentAlt } from "react-icons/tfi";
import { CgMoreO } from "react-icons/cg";
import FormStateComment from "@/interfaces/matches/form-state-comment.interface";
import getComments from "@/helpers/getComments";
import commentApplication from "@/helpers/commentApplication";
import { MdOutlineMail } from "react-icons/md";
import SmallAddress from "@/components/shared/Address";
import dynamic from "next/dynamic";
import approveApplication from "@/helpers/approveApplication";
import rejectApplication from "@/helpers/rejectApplication";
import { relative } from "path";
import deleteComment from "@/helpers/deleteComment";
import RecruiterState from "@/interfaces/recruiter/form-state-get-recruiter.interface";
import getRecruiterProfile from "@/helpers/getRecruiterProfile";
import Form from "@/interfaces/applicant/form-state-get-applicant.interface";

export default function RecruiterMatches() {
  const [jobPosts, setJobPosts] = useState<FormState[]>([]);
  const [applications, setApplications] = useState<{ [key: string]: FormStateApplication[] }>({});
  const [comments, setComments] = useState<FormStateComment[]>();
  const [comment, setComment] = useState({ comment_body: "" });
  const [recruiter, setRecruiter] = useState<RecruiterState>();
  const [comparison, setComparison] = useState<FormStateApplication[]>([]);

  const [postId, setPostId] = useState<string>("");
  const [accId, setAccId] = useState<string>("");
  const [appl, setAppl] = useState<Form>({
    profile_picture: "",
    first_name: "",
    last_name: "",
    education_level: {
      id: 0,
      education_level: "",
    },
    age: 0,
    gender: "",
    skills: [],
    experiences: [],
    cv: "",
    work_type: {
      id: 0,
      work_type: "",
    },
    seniority_level: 0,
    position: {
      id: 0,
      position_name: "",
    },
    home_location: {
      longitude: 0,
      latitude: 0,
    },
    work_location_max_distance: 0,
    contract_type: {
      id: 0,
      contract_type: "",
    },
    min_salary: 0,
    education_level_id: 0,
    position_id: 0,
    contract_type_id: 0,
    work_type_id: 0,
  });

  const { isOpen: isCommentsModalOpen, onOpen: onCommentsModalOpen, onClose: onCommentsModalClose } = useDisclosure();
  const { isOpen: isMoreModalOpen, onOpen: onMoreModalOpen, onClose: onMoreModalClose } = useDisclosure();
  const { isOpen: isCompareOpen, onOpen: onCompareOpen, onClose: onCompareClose } = useDisclosure();
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

  const approve = async (jobPostId: string | undefined, applicantId: string | undefined) => {
    if (jobPostId && applicantId) {
      try {
        const response = await approveApplication(jobPostId, applicantId);
        if (response == 200) {
          window.location.reload();
        }
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

  const addToComparison = (applicant: FormStateApplication) => {
    if (comparison.length !== 2) {
      setComparison([...comparison, applicant]);
    }
  };

  const removeFromComparison = (applicant: FormStateApplication) => {
    const updatedComparison = comparison.filter((item) => item.applicant_account_id !== applicant.applicant_account_id);
    setComparison(updatedComparison);
  };

  const allApplications = Object.values(applications).flatMap((appArray) => appArray);

  return (
    <Sidenav>
      <Flex direction="column" align="center" gap="32px">
        {!!comparison?.length && (
          <Button
            bg="#2E77AE"
            color="#fff"
            className="compare-button"
            _hover={{ bg: "#E0EAF5", color: "#2E77AE" }}
            onClick={onCompareOpen}
          >
            Compare
          </Button>
        )}
        {jobPosts.map(
          (jobPost, index) =>
            allApplications.filter(
              (application) => application.job_post_id === jobPost.id && application.approved_by_company == null
            ).length > 0 && (
              <Card w="100%" key={index}>
                <CardHeader w="100%" bg="#2E77AE">
                  <Heading textAlign="center" color="white">
                    {jobPost.position?.position_name}
                  </Heading>
                </CardHeader>
                <Flex w="100%" justify="center" wrap="wrap" p="32px" gap="16px">
                  {allApplications.map(
                    (application, ind) =>
                      application.job_post_id == jobPost.id &&
                      !application.approved_by_company && (
                        <div key={ind}>
                          <Flex direction="column" w="360px">
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
                                src={
                                  application.applicant.profile_picture
                                    ? `data:image/jpeg;base64,${application.applicant.profile_picture}`
                                    : "https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                                }
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
                                    setAppl({
                                      ...appl,
                                      first_name: application.applicant.first_name,
                                      last_name: application.applicant.last_name,
                                      profile_picture: application.applicant.profile_picture,
                                    });
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
                                  onClick={() => {
                                    onMoreModalOpen();
                                    setAppl({
                                      ...appl,
                                      first_name: application.applicant.first_name,
                                      last_name: application.applicant.last_name,
                                      age: application.applicant.age,
                                      gender: application.applicant.gender,
                                      home_location: {
                                        latitude: application.applicant.home_location.latitude,
                                        longitude: application.applicant.home_location.longitude,
                                      },
                                      work_location_max_distance: application.applicant.work_location_max_distance,
                                      cv: application.applicant.cv,
                                      min_salary: application.applicant.min_salary,
                                      experiences: application.applicant.experiences,
                                    });
                                  }}
                                  variant="ghost"
                                  _hover={{ bg: "white", color: "#2E77AE" }}
                                >
                                  <Flex mt="8px" align="center" gap="8px">
                                    <CgMoreO size="16px" />
                                    <Text>See more</Text>
                                  </Flex>
                                </Button>
                              </Flex>

                              <Flex gap="16px">
                                {comparison.length <= 2 &&
                                  !comparison.some(
                                    (item) => item.applicant_account_id === application.applicant_account_id
                                  ) && (
                                    <Button
                                      onClick={() => {
                                        addToComparison(application);
                                      }}
                                      variant="ghost"
                                      _hover={{ bg: "white", color: "#2E77AE" }}
                                      className={comparison.length >= 2 ? "isAdded" : ""}
                                    >
                                      <Flex mt="8px" align="center" gap="8px">
                                        <TfiPlus size="16px" />
                                        <Text>Add to comparison</Text>
                                      </Flex>
                                    </Button>
                                  )}
                                {comparison.some(
                                  (item) => item.applicant_account_id === application.applicant_account_id
                                ) && (
                                  <Button
                                    onClick={() => {
                                      removeFromComparison(application);
                                    }}
                                    variant="ghost"
                                    _hover={{ bg: "white", color: "#2E77AE" }}
                                  >
                                    <Flex mt="8px" align="center" gap="8px">
                                      <TfiMinus size="16px" />
                                      <Text>Remove from comparison</Text>
                                    </Flex>
                                  </Button>
                                )}
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
                                  onClick={() => approve(jobPost.id, application.applicant_account_id)}
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
                                    {appl.first_name} {appl.last_name}
                                  </Heading>
                                  <Text fontSize="sm" color="gray.500">
                                    {comments?.length} comments
                                  </Text>
                                </ModalHeader>

                                <ModalBody mt="80px">
                                  <Flex align="center" gap="8px">
                                    <Avatar
                                      src={
                                        recruiter?.profile_picture
                                          ? `data:image/jpeg;base64,${recruiter.profile_picture}`
                                          : "https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                                      }
                                      size="sm"
                                    />
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

                                  {comments?.map((comment, i) => (
                                    <Flex
                                      direction="column"
                                      mt="16px"
                                      gap="8px"
                                      bg="#E0EAF5"
                                      borderRadius="8px"
                                      p="8px"
                                      key={i}
                                    >
                                      <Flex justify="space-between">
                                        <Flex gap="8px" align="center">
                                          <Avatar
                                            src={
                                              comment.recruiter?.profile_picture
                                                ? `data:image/jpeg;base64,${comment.recruiter?.profile_picture}`
                                                : "https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                                            }
                                            size="sm"
                                          />
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
                                    {appl.first_name} {appl.last_name}
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
                                    <Text>{appl.age} years old, </Text>
                                    {appl.gender == "male" && (
                                      <>
                                        <IoMaleSharp size="18px" />
                                        <Text>Male</Text>
                                      </>
                                    )}
                                    {appl.gender == "female" && (
                                      <>
                                        <IoFemaleSharp size="18px" />
                                        <Text>Female</Text>
                                      </>
                                    )}
                                    {appl.gender == "other" && (
                                      <>
                                        <FaGenderless size="18px" />
                                        <Text>Other</Text>
                                      </>
                                    )}
                                  </Flex>

                                  <Flex justify="center">
                                    <SmallAddress
                                      lat={appl.home_location.latitude}
                                      long={appl.home_location.longitude}
                                    ></SmallAddress>
                                    <Text mt="8px">, max distance: {appl.work_location_max_distance}km</Text>
                                  </Flex>

                                  <Flex justify="center" color="#2E77AE" mt="16px" align="center" gap="8px">
                                    <FaFileDownload size="24px" />
                                    <a ref={downloadLinkRef} onClick={() => downloadFile(appl.cv || "")}>
                                      Download CV
                                    </a>
                                  </Flex>

                                  <Flex justify="center" mt="16px" gap="8px" align="center">
                                    <FaMoneyBillWave size="18px" />
                                    <Text>Min salary: {appl.min_salary}€</Text>
                                  </Flex>

                                  {appl.experiences.length > 0 && (
                                    <Box mt="16px" mb="16px" border="1px solid #2E77AE" />
                                  )}

                                  {appl.experiences.length > 0 && (
                                    <Text textAlign="center" fontSize="xl" pb="16px" color="#2E77AE">
                                      <strong>WORK EXPERIENCES</strong>
                                    </Text>
                                  )}

                                  {appl.experiences.map((experience, index) => (
                                    <div key={index}>
                                      <Text align="center" mb="8px">
                                        Company name - {experience.company_name}
                                      </Text>
                                      <Text align="center" mb="8px">
                                        Position - {experience.position?.position_name}
                                      </Text>
                                      <Text align="center" mb="16px">
                                        Years - {experience.years}
                                      </Text>
                                    </div>
                                  ))}

                                  {appl.experiences.length > 0 && <Box border="1px solid #2E77AE" />}
                                </ModalBody>

                                <ModalFooter>
                                  <Button colorScheme="blue" onClick={onMoreModalClose}>
                                    Close
                                  </Button>
                                </ModalFooter>
                              </ModalContent>
                            </Modal>
                          </Flex>
                        </div>
                      )
                  )}
                </Flex>
              </Card>
            )
        )}
        <Modal className="compare-modal" isOpen={isCompareOpen} onClose={onCompareClose} size="xl" isCentered={true}>
          <ModalOverlay className="compare-modal-container" />
          <ModalContent className="compare-modal">
            <ModalHeader>
              <Heading textAlign="center" size="lg">
                Compare applicants
              </Heading>
            </ModalHeader>
            <ModalBody mt="64px">
              <Flex w="100%">
                <Flex w="24%" p="0 20px"></Flex>
                <Flex w="38%" justify="center">
                  <Text fontSize="24px" fontWeight="bold">
                    {comparison[0]?.applicant.first_name} {comparison[0]?.applicant.last_name}
                  </Text>
                </Flex>
                <Flex w="38%" justify="center">
                  <Text fontSize="24px" fontWeight="bold">
                    {comparison[1]?.applicant.first_name} {comparison[1]?.applicant.last_name}
                  </Text>
                </Flex>
              </Flex>

              <Box mt="16px" mb="16px" border="1px solid #2E77AE" />

              <Flex w="100%">
                <Flex w="24%" p="0 20px">
                  <LiaBirthdayCakeSolid size="20px" />
                  <Text marginLeft="10px">Age</Text>
                </Flex>
                <Flex w="38%" justify="center">
                  <Text>{comparison[0]?.applicant.age} years old</Text>
                </Flex>
                <Flex w="38%" justify="center">
                  <Text>{comparison[1]?.applicant.age} years old</Text>
                </Flex>
              </Flex>

              <Box mt="16px" mb="16px" border="1px solid #2E77AE" />

              <Flex w="100%">
                <Flex w="24%" p="0 20px"></Flex>
                <Flex w="38%" justify="center">
                  {comparison[0]?.applicant.gender == "male" && (
                    <>
                      <IoMaleSharp size="18px" />
                      <Text>Male</Text>
                    </>
                  )}
                  {comparison[0]?.applicant.gender == "female" && (
                    <>
                      <IoFemaleSharp size="18px" />
                      <Text>Female</Text>
                    </>
                  )}
                  {comparison[0]?.applicant.gender == "other" && (
                    <>
                      <FaGenderless size="18px" />
                      <Text>Other</Text>
                    </>
                  )}
                </Flex>
                <Flex w="38%" justify="center">
                  {comparison[1]?.applicant.gender == "male" && (
                    <>
                      <IoMaleSharp size="18px" />
                      <Text>Male</Text>
                    </>
                  )}
                  {comparison[1]?.applicant.gender == "female" && (
                    <>
                      <IoFemaleSharp size="18px" />
                      <Text>Female</Text>
                    </>
                  )}
                  {comparison[1]?.applicant.gender == "other" && (
                    <>
                      <FaGenderless size="18px" />
                      <Text>Other</Text>
                    </>
                  )}
                </Flex>
              </Flex>

              <Box mt="16px" mb="16px" border="1px solid #2E77AE" />

              <Flex w="100%">
                <Flex w="24%" p="0 20px">
                  <FaGraduationCap size="24px" />
                  <Text marginLeft="10px">Education</Text>
                </Flex>
                <Flex w="38%" justify="center">
                  <Text>{comparison[0]?.applicant.education_level.education_level}</Text>
                </Flex>
                <Flex w="38%" justify="center">
                  <Text>{comparison[1]?.applicant.education_level.education_level}</Text>
                </Flex>
              </Flex>

              <Box mt="16px" mb="16px" border="1px solid #2E77AE" />

              <Flex w="100%">
                <Flex w="24%" p="0 20px">
                  <LiaCertificateSolid size="24px" />
                  <Text marginLeft="10px">Seniority</Text>
                </Flex>
                <Flex w="38%" justify="center">
                  <Text>{comparison[0]?.applicant.seniority_level}</Text>
                </Flex>
                <Flex w="38%" justify="center">
                  <Text>{comparison[1]?.applicant.seniority_level}</Text>
                </Flex>
              </Flex>

              <Box mt="16px" mb="16px" border="1px solid #2E77AE" />

              <Flex w="100%">
                <Flex w="24%" p="0 20px">
                  <FaLocationDot size="24px" />
                  <Text marginLeft="10px">Location</Text>
                </Flex>
                <Flex w="38%" justify="center">
                  <Text>{comparison[0]?.applicant.work_type.work_type}</Text>
                </Flex>
                <Flex w="38%" justify="center">
                  <Text>{comparison[1]?.applicant.work_type.work_type}</Text>
                </Flex>
              </Flex>

              <Box mt="16px" mb="16px" border="1px solid #2E77AE" />

              <Flex w="100%">
                <Flex w="24%" p="0 20px">
                  <IoBriefcaseSharp size="24px" />
                  <Text marginLeft="10px">Contract type</Text>
                </Flex>
                <Flex w="38%" justify="center">
                  <Text>{comparison[0]?.applicant.contract_type.contract_type}</Text>
                </Flex>
                <Flex w="38%" justify="center">
                  <Text>{comparison[1]?.applicant.contract_type.contract_type}</Text>
                </Flex>
              </Flex>

              <Box mt="16px" mb="16px" border="1px solid #2E77AE" />

              <Flex w="100%">
                <Flex w="24%" p="0 20px">
                  <FaMoneyBillWave size="24px" />
                  <Text marginLeft="10px">Min salary</Text>
                </Flex>
                <Flex w="38%" justify="center">
                  <Text>{comparison[0]?.applicant.min_salary}€</Text>
                </Flex>
                <Flex w="38%" justify="center">
                  <Text>{comparison[1]?.applicant.min_salary}€</Text>
                </Flex>
              </Flex>

              <Box mt="16px" mb="16px" border="1px solid #2E77AE" />

              <Flex w="100%">
                <Flex w="24%" p="0 20px">
                  <FaLocationDot size="24px" />
                  <Text marginLeft="10px">Max distance</Text>
                </Flex>
                <Flex w="38%" justify="center">
                  <Text>{comparison[0]?.applicant.work_location_max_distance}km</Text>
                </Flex>
                <Flex w="38%" justify="center">
                  <Text>{comparison[1]?.applicant.work_location_max_distance}km</Text>
                </Flex>
              </Flex>

              <Box mt="16px" mb="16px" border="1px solid #2E77AE" />

              <Flex w="100%" flexWrap="wrap">
                <Flex w="24%" p="0 20px">
                  <FaPaperclip size="24px" />
                  <Text marginLeft="10px">Experience</Text>
                </Flex>
                <Flex w="38%" flexFlow="column">
                  {comparison[0]?.applicant.experiences.map((experience, index) => (
                    <div key={index}>
                      <Text align="center" mb="8px">
                        Company name - {experience.company_name}
                      </Text>
                      <Text align="center" mb="8px">
                        Position - {experience.position?.position_name}
                      </Text>
                      <Text align="center" mb="16px">
                        Years - {experience.years}
                      </Text>

                      {index + 1 !== comparison[0].applicant.experiences.length && (
                        <Box m="16px 8px" border="1px solid #2E77AE" />
                      )}
                    </div>
                  ))}
                </Flex>
                <Flex w="38%" flexFlow="column">
                  {comparison[1]?.applicant.experiences.map((experience, index) => (
                    <div key={index}>
                      <Text align="center" mb="8px">
                        {experience.company_name}
                      </Text>
                      <Text align="center" mb="8px">
                        {experience.position?.position_name}
                      </Text>
                      <Text align="center" mb="16px">
                        {experience.years} years
                      </Text>
                      {index + 1 !== comparison[1].applicant.experiences.length && (
                        <Box mt="16px" mb="16px" border="1px solid #2E77AE" />
                      )}
                    </div>
                  ))}
                </Flex>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onCompareClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Sidenav>
  );
}
