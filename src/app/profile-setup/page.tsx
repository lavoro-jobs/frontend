"use client"

import { Role } from "@/types/Auth"
import RecruiterProfileSetup from "@/components/features/profileSetup/RecruiterProfileSetup"
import useProtectedRoute from "@/hooks/useProtectedRoute"
import getApplicantProfile from "@/helpers/getApplicantProfile"
import getRecruiterProfile from "@/helpers/getRecruiterProfile"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import getCurrentRecruiterProfile from "@/helpers/getCurrentRecruiterProfile"
import dynamic from "next/dynamic"

const DynamicApplicantProfileSetup = dynamic(() => import("@/components/features/profileSetup/ApplicantProfileSetup"), {
    ssr: false,
})

export default function Profile() {
    const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER])
    const router = useRouter()

    useEffect(() => {
        const navigateTo = (path: string) => router.push(path)
        const isProfileSetupNeeded = (profile: any) => profile == null || profile?.first_name === null

        const handleRecruiterProfile = async () => {
            try {
                const profile = await getCurrentRecruiterProfile()
                if (!isProfileSetupNeeded(profile)) {
                    navigateTo("/dashboard")
                } else {
                    return <RecruiterProfileSetup></RecruiterProfileSetup>
                }
            } catch (error) {
                // Navigating to profile-setup if the recruiter is not in the db
                navigateTo("/profile-setup")
            }
        }

        const handleApplicantProfile = async () => {
            try {
                const profile = await getApplicantProfile()
                if (!isProfileSetupNeeded(profile)) {
                    navigateTo("/dashboard")
                } else {
                    return <DynamicApplicantProfileSetup></DynamicApplicantProfileSetup>
                }
            } catch (error) {
                // Navigating to profile-setup if the recruiter is not in the db
                navigateTo("/profile-setup")
            }
        }

        const checkProfile = async () => {
            if (!auth) return
            if (auth.role === Role.RECRUITER) {
                await handleRecruiterProfile()
            } else if (auth.role === Role.APPLICANT) {
                await handleApplicantProfile()
            }
        }
        checkProfile()
    }, [auth, router])

    if (auth?.role == Role.APPLICANT) {
        return <DynamicApplicantProfileSetup></DynamicApplicantProfileSetup>
    } else if (auth?.role == Role.RECRUITER) {
        return <RecruiterProfileSetup></RecruiterProfileSetup>
    }
}
