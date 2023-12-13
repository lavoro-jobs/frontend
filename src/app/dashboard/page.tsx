"use client";

import { Role } from "@/types/Auth";
import ApplicantDashboard from "@/components/features/dashboard/ApplicantDashboard";
import RecruiterDashboard from "@/components/features/dashboard/RecruiterDashboard";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import getCurrentRecruiterProfile from "@/helpers/getCurrentRecruiterProfile";
import getApplicantProfile from "@/helpers/getApplicantProfile";

export default function Dashboard() {
  const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER]);
  const router = useRouter();

  useEffect(() => {
    const navigateTo = (path: string) => router.push(path);
    const isProfileSetupNeeded = (profile: any) => profile == null || profile?.first_name === null;

    const handleRecruiterProfile = async () => {
      try {
        const profile = await getCurrentRecruiterProfile();
        const path = isProfileSetupNeeded(profile) ? "/profile-setup" : "/profile";
        navigateTo(path);
      } catch (error) {
        // Navigating to profile-setup if the recruiter is not in the db
        navigateTo("/profile-setup");
      }
    };

    const handleApplicantProfile = async () => {
      try {
        const profile = await getApplicantProfile();
        console.log(profile);
        const path = isProfileSetupNeeded(profile) ? "/profile-setup" : "/profile";
        navigateTo(path);
      } catch (error) {
        console.log(("ERROR"))
        // Navigating to profile-setup if the applicant is not in the db
        navigateTo("/profile-setup")
      }
    };

    const checkProfile = async () => {
      if (!auth) return;
      if (auth.role === Role.RECRUITER) {
        await handleRecruiterProfile();
      } else {
        await handleApplicantProfile();
      }
    };
    checkProfile();
  }, [auth, router]);

  if (auth?.role == Role.APPLICANT) {
    return <ApplicantDashboard></ApplicantDashboard>;
  } else if (auth?.role == Role.RECRUITER) {
    return <RecruiterDashboard></RecruiterDashboard>;
  }
}
