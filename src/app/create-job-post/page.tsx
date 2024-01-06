"use client"

import useProtectedRoute from "@/hooks/useProtectedRoute"
import { Role } from "@/types/Auth"
import dynamic from "next/dynamic"

const DynamicCreateJobPost = dynamic(() => import("@/components/features/jobPost/CreateJobPost"), { ssr: false })

export default function JobPost() {
    const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER])

    if (auth?.role == Role.RECRUITER) {
        return <DynamicCreateJobPost></DynamicCreateJobPost>
    }
}
