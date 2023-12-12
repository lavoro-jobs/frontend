    "use client";

    import ApplicantProfileSetup from "@/components/features/profileSetup/ApplicantProfileSetup";
    import { Role } from "@/types/Auth";
    import RecruiterProfileSetup from "@/components/features/profileSetup/RecruiterProfileSetup";
    import useProtectedRoute from "@/hooks/useProtectedRoute";
    import getApplicantProfile from "@/helpers/getApplicantProfile";
    import getRecruiterProfile from "@/helpers/getRecruiterProfile";
    import { useRouter } from "next/navigation";

    export default function Profile() {
      const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER]);
      const router = useRouter();

      if (auth?.role == Role.APPLICANT) {
        getApplicantProfile().then((resp) => {
          router.push("/dashboard");
        }).catch((err) => {
          if (error.response && error.response.status === 404) {
            return <ApplicantProfileSetup></ApplicantProfileSetup>;
          }
        });
      } else if (auth?.role == Role.RECRUITER) {
        getRecruiterProfile().then((resp) => {
          router.push("/dashboard");
        }).catch((err) => {
          if (error.response && error.response.status === 404) {
            return <RecruiterProfileSetup></RecruiterProfileSetup>;
          }
        });
      }
    }
