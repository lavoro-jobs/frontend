"use client";

import { Role } from "@/types/Auth";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import ApplicantProfile from "@/components/features/profile/ApplicantProfile";
import RecruiterProfile from "@/components/features/profile/RecruiterProfile";

export default function Profile() {
  const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER]);

  if (auth?.role == Role.APPLICANT) {
    return <ApplicantProfile></ApplicantProfile>;
  } else if (auth?.role == Role.RECRUITER) {
    return <RecruiterProfile></RecruiterProfile>;
  }
}
