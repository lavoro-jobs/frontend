"use client"

import { Role } from "@/types/Auth"
import useProtectedRoute from "@/hooks/useProtectedRoute"
import RecruiterProfile from "@/components/features/profile/RecruiterProfile"
import dynamic from "next/dynamic"

const DynamicApplicantProfile = dynamic(() => import("@/components/features/profile/ApplicantProfile"), { ssr: false })

export default function Profile() {
    const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER])

    if (auth?.role == Role.APPLICANT) {
        return <DynamicApplicantProfile></DynamicApplicantProfile>
    } else if (auth?.role == Role.RECRUITER) {
        return <RecruiterProfile></RecruiterProfile>
    }
}
