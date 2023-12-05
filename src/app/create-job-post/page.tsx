"use client";

import CreateJobPost from "@/components/features/jobPost/CreateJobPost";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { Role } from "@/types/Auth";

export default function JobPost() {
  const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER]);

  if (auth?.role == Role.RECRUITER) {
    return <CreateJobPost></CreateJobPost>;
  }
}
