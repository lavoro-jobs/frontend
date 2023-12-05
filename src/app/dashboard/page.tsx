"use client"

import {Role} from "@/types/Auth";
import ApplicantDashboard from "@/components/features/dashboard/ApplicantDashboard";
import RecruiterDashboard from "@/components/features/dashboard/RecruiterDashboard";
import useProtectedRoute from "@/hooks/useProtectedRoute";

export default function Dashboard() {
  const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER])

  if(auth?.role == Role.APPLICANT) {
    return <ApplicantDashboard></ApplicantDashboard>
  } else if (auth?.role == Role.RECRUITER){
    return <RecruiterDashboard></RecruiterDashboard>
  }
}
