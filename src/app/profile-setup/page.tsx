"use client";

import ApplicantProfileSetup from "@/components/features/profileSetup/ApplicantProfileSetup";
import { Role } from "@/types/Auth";
import RecruiterProfileSetup from "@/components/features/profileSetup/RecruiterProfileSetup";
import useProtectedRoute from "@/hooks/useProtectedRoute";

export default function Profile() {
	const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER]);

	if (auth?.role == Role.APPLICANT) {
		return <ApplicantProfileSetup></ApplicantProfileSetup>;
	} else if (auth?.role == Role.RECRUITER) {
		return <RecruiterProfileSetup></RecruiterProfileSetup>;
	}
}
