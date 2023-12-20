"use client";

import { Role } from "@/types/Auth";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import ApplicantMatches from "@/components/features/matches/ApplicantMatches";
import RecruiterMatches from "@/components/features/matches/RecruiterMatches";

export default function Profile() {
  const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER]);

  if (auth?.role == Role.APPLICANT) {
    return <ApplicantMatches></ApplicantMatches>;
  } else if (auth?.role == Role.RECRUITER) {
    return <RecruiterMatches></RecruiterMatches>;
  }
}
