"use client";

import useProtectedRoute from "@/hooks/useProtectedRoute";
import { Role } from "@/types/Auth";
import Sidenav from "@/components/features/dashboard/Sidenav";
import {
  Box,
  Button,
  Flex,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  useRadio,
  useRadioGroup,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import getJobPostsByRecruiter from "@/helpers/getJobPosts";
import FormState from "@/interfaces/job-posts/form-state.interface";
import JobPost from "@/components/features/jobPost/JobPost";


export default function JobPosts() {
  const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER]);
  const [jobPosts, setJobPosts] = useState<FormState[]>([]);
  const [filteredJobPosts, setFilteredJobPosts] = useState<FormState[]>([]);
  const [option, setOption] = useState("Show All")
  const options = ['Show All', 'Show Archived', 'Show Active']
  const handleChange = (prop: any) => {
    setOption(prop);
  }
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'option',
    defaultValue: option,
    onChange: handleChange,
  })
  const group = getRootProps()


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

  function RadioCard(props: any) {
    const { getInputProps, getRadioProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getRadioProps()

    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='1px'
          borderRadius='md'
          boxShadow='md'
          _checked={{
            bg: '#3182CE',
            color: 'white',
            borderColor: 'teal.600',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={5}
          py={3}
        >
          {props.children}
        </Box>
      </Box>
    )
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
          <HStack ml="4vw" mb="2vw" alignSelf="start" {...group}>
            {options.map((value) => {
              const radio = getRadioProps({ value, onChange: handleOptionChange })
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              )
            })}
          </HStack>
          <Wrap spacing="32px" justify="center" align="stretch">
            {filteredJobPosts.map((post) => (
              <WrapItem key={post.id}>
                <JobPost
                  id={post.id}
                  position={post.position}
                  description={post.description}
                  education_level={post.education_level}
                  skills={post.skills}
                  work_type={post.work_type}
                  seniority_level={post.seniority_level}
                  work_location={post.work_location}
                  contract_type={post.contract_type}
                  salary_min={post.salary_min}
                  salary_max={post.salary_max}
                  end_date={post.end_date}
                  assignees={post.assignees}
                />
              </WrapItem>
            ))}
          </Wrap>
        </Flex>
      </Sidenav>
    );
  }
}
