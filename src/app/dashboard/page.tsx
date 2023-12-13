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

    const handleProfile = async (getProfileFunction: any) => {
      try {
        const profile = await getProfileFunction();
        if (isProfileSetupNeeded(profile)) {
          navigateTo("/profile-setup");
        }
      } catch (error) {
        // Navigating to profile-setup if the person is not in the db
        console.error("ERROR:", error);
        navigateTo("/profile-setup");
      }
    };

    const checkProfile = async () => {
      if (!auth) return;
      if (auth.role === Role.RECRUITER) {
        await handleProfile(getCurrentRecruiterProfile);
      } else {
        await handleProfile(getApplicantProfile);
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
