"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import getUserProfile from "@/helpers/getUserProfile"

import ProfileSetup from "@/components/features/profileSetup/ProfileSetup"

export default function Profile() {
  const router = useRouter()

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await getUserProfile()
      if (response.ok) {
      } else {
        router.push("/signin")
      }
    }
    getCurrentUser()
  }, [])
  
  return <ProfileSetup></ProfileSetup>
}
