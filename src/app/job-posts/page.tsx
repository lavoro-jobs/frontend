"use client";

import useProtectedRoute from "@/hooks/useProtectedRoute";
import { Role } from "@/types/Auth";
import Sidenav from "@/components/features/dashboard/Sidenav";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import JobPost from "@/components/features/jobPost/JobPost";

export default function JobPosts() {
	const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER]);

	const fakeJobPosts = [
		{
			position_id: 1,
			education_level_id: 1,
			seniority_level_id: 1,
			skill_id_list: [1, 2, 3, 4, 5, 6, 7, 8],
			work_type_id: 1,
			contract_type_id: 1,
			work_location: {
				longitude: 0,
				latitude: 0,
			},
			salary: 5,
			description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, itaque facere esse sit sint molestiae?",
		},
    {
			position_id: 5,
			education_level_id: 2,
			seniority_level_id: 4,
			skill_id_list: [10, 11, 13, 20, 6, 7, 8],
			work_type_id: 3,
			contract_type_id: 4,
			work_location: {
				longitude: 0,
				latitude: 0,
			},
			salary: 10,
			description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, itaque facere esse sit sint molestiae?",
		},
	];

	if (auth?.role == Role.RECRUITER) {
		return (
			<Sidenav>
				<Flex align="center" padding="100px 0" justify="center" direction="column" bg="#E0EAF5">
					<Heading marginBottom="32px" maxW="512px" textAlign="center" color="#0D2137">
						Job posts
					</Heading>
				</Flex>
        <Link href="/create-job-post">
					<Button colorScheme="blue" marginTop="16px" marginBottom="16px">
						Create new job post
					</Button>
				</Link>
				<Flex gap="16px">
					{/*TODO - get all job posts and create a JobPost component for each */}
					{fakeJobPosts.map((post, index) => (
						<JobPost
							key={index}
							position_id={post.position_id}
							education_level_id={post.education_level_id}
							seniority_level_id={post.seniority_level_id}
							skill_id_list={post.skill_id_list}
              work_type_id={post.work_type_id}
							contract_type_id={post.contract_type_id}
							work_location={post.work_location}
							salary={post.salary}
              description={post.description}
						></JobPost>
					))}
				</Flex>
				
			</Sidenav>
		);
	}
}
