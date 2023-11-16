"use client"

import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"
import { usePathname, useRouter } from "next/navigation"
import useProtectedRoute from "@/hooks/useProtectedRoute"
import { Role } from "@/types/User"
import { Spinner } from "@chakra-ui/react"

export default function Profile() {
  const { auth, loading } = useProtectedRoute([Role.APPLICANT])

  return (
    <>
      <Header currentRoute={usePathname()} />
      {loading && <Spinner />}
      <Footer />
    </>
  )
}
