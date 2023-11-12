"use client"

import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

import getUserProfile from "@/helpers/getUserProfile"

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

  return (
    <>
      <Header currentRoute={usePathname()} />

      <Footer />
    </>
  )
}
