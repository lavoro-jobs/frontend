"use client";

import useProtectedRoute from "@/hooks/useProtectedRoute";
import { Role } from "@/types/Auth";
import Sidenav from "@/components/features/dashboard/Sidenav";
import {Button, Flex, Wrap, WrapItem} from "@chakra-ui/react";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import getJobPostsByRecruiter from "@/helpers/getJobPosts";
import FormState from "@/interfaces/job-posts/form-state.interface";
import JobPost from "@/components/features/jobPost/JobPost";

export default function JobPosts() {

  const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER]);

  const [jobPosts, setJobPosts] = useState<FormState[]>([]);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const data = await getJobPostsByRecruiter();
        console.log(data)
        setJobPosts(data);
      } catch (error) {
        console.error("Failed to fetch job posts", error);
      }
    };

    fetchJobPosts();
  }, []);

  if (auth?.role == Role.RECRUITER) {
    return (
      <Sidenav>
        <Flex align="center" padding="100px 0" justify="center" direction="column" bg="#E0EAF5">
          <Link href="/create-job-post">
            <Button colorScheme="blue" marginTop="16px" marginBottom="16px">
              Create new job post
            </Button>
          </Link>
          <Wrap spacing="16px" justify="center" align="stretch">
            {jobPosts.map((post) => (
              <WrapItem key={post.id}> {}
                <JobPost
                  position_id={post.position_id}
                  education_level_id={post.education_level_id}
                  seniority_level={post.seniority_level}
                  skill_ids={post.skill_ids}
                  work_type_id={post.work_type_id}
                  contract_type_id={post.contract_type_id}
                  work_location={post.work_location}
                  salary_min={post.salary_min}
                  salary_max={post.salary_max}
                  description={post.description}
                />
              </WrapItem>
            ))}
          </Wrap>
        </Flex>
      </Sidenav>
    );
  }
}
