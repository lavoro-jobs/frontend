"use client";

import useProtectedRoute from "@/hooks/useProtectedRoute";
import { Role } from "@/types/Auth";
import Sidenav from "@/components/features/dashboard/Sidenav";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
  useRadio,
  useRadioGroup,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import getJobPostsByRecruiter from "@/helpers/getJobPosts";
import FormState from "@/interfaces/job-posts/form-state.interface";
import JobPost from "@/components/features/jobPost/JobPost";
import updateJobPost from "@/helpers/updateJobPost";
import RadioCard from "@/components/features/jobPost/RadioCard";

export default function JobPosts() {
  const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER]);

  const [jobPosts, setJobPosts] = useState<FormState[]>([]);
  const [filteredJobPosts, setFilteredJobPosts] = useState<FormState[]>([]);
  const [option, setOption] = useState("Show All");

  const options = ["Show All", "Show Archived", "Show Active"];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newEndDate, setNewEndDate] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (newEndDate) {
      const end_date = new Date(newEndDate);
      const today = new Date();
      if (end_date < today) {
        setError(true);
      } else {
        setError(false);
      }
    } else {
      setError(false);
    }
  }, [newEndDate]);

  const openModalForPost = (postId: any) => {
    setSelectedPostId(postId);
    onOpen();
  };

  const handleSubmit = () => {
    if (!error) {
      const postData = {
        id: selectedPostId,
        end_date: newEndDate + ":00.000Z",
      };
      updateJobPost(postData);
      window.location.reload();
      onClose();
    }
  };

  const handleChange = (prop: any) => {
    setOption(prop);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "option",
    defaultValue: option,
    onChange: handleChange,
  });

  const group = getRootProps();

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const data = await getJobPostsByRecruiter();
        setJobPosts(data);
      } catch (error) {
        console.error("Failed to fetch job posts", error);
      }
    };

    fetchJobPosts();
  }, []);

  useEffect(() => {
    const filteredPosts = jobPosts.filter((post) => {
      if (option === "Show Archived") {
        return isArchived(post.end_date);
      } else if (option === "Show Active") {
        return !isArchived(post.end_date);
      }
      return true;
    });

    setFilteredJobPosts(filteredPosts);
  }, [option, jobPosts]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value);
  };

  function isArchived(endDateStr: any): boolean {
    const endDate = new Date(endDateStr);
    const now = new Date();
    return endDate < now;
  }

  if (auth?.role == Role.RECRUITER) {
    return (
      <Sidenav>
        <Flex align="center" padding="100px 0" justify="center" direction="column" bg="#E0EAF5">
          <Link href="/create-job-post">
            <Button colorScheme="blue" marginBottom="32px">
              Create new job post
            </Button>
          </Link>
          <HStack mb="32px" alignSelf="center" {...group}>
            {options.map((value) => {
              const radio = getRadioProps({ value, onChange: handleOptionChange });
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </HStack>
          <Wrap spacing="32px" justify="center" align="stretch">
            {filteredJobPosts.map((post) => (
              <WrapItem key={post.id}>
                <JobPost {...post} openRestoreModal={() => openModalForPost(post.id)} />
              </WrapItem>
            ))}
          </Wrap>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <Box>
              <Text fontSize="xl" pt="16px" pl="24px" textAlign="left" color="#2E77AE">
                Restore Job Post
              </Text>
              <ModalCloseButton zIndex="1" position="absolute" top="3" right="3" />
            </Box>

            <ModalBody>
              <Text fontSize="lg" pt="16px" color="#2E77AE">
                End Date
              </Text>
              <div className="inputs-wrapper-center">
                <Input
                  borderColor="#2E77AE"
                  id="end_date"
                  type="datetime-local"
                  value={newEndDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                />
              </div>
              {error && (
                <Text mt="4px" color="red">
                  The end date should be ahead of today's date.
                </Text>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Sidenav>
    );
  }
}
