"use client";

import useProtectedRoute from "@/hooks/useProtectedRoute";
import { Role } from "@/types/Auth";
import Sidenav from "@/components/features/dashboard/Sidenav";
import { Button, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
            <Button colorScheme="blue" marginBottom="32px">
              Create new job post
            </Button>
          </Link>
          <Wrap spacing="32px" justify="center" align="stretch">
            {jobPosts.map((post) => (
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
