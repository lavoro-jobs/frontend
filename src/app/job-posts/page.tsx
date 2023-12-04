"use client";

import useProtectedRoute from "@/hooks/useProtectedRoute";
import { Role } from "@/types/Auth";
import Sidenav from "@/components/features/dashboard/Sidenav";
import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

export default function JobPosts() {
	const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER]);

	if (auth?.role == Role.RECRUITER) {
		return (
			<Sidenav>
				<Flex align="center" padding="100px 0" justify="center" direction="column" bg="#E0EAF5">
					<Heading marginBottom="32px" maxW="512px" textAlign="center" color="#0D2137">
						Job posts
					</Heading>
				</Flex>
				<Link href="/create-job-post">
					<Button colorScheme="blue" marginTop="16px" >Create new job post</Button>
				</Link>
			</Sidenav>
		);
	}
}
