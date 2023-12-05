"use client";

import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"
import { usePathname } from "next/navigation"
import useProtectedRoute from "@/hooks/useProtectedRoute"
import { Role } from "@/types/Auth"
import {Flex, Spinner} from "@chakra-ui/react"

export default function Company() {
  const { loading } = useProtectedRoute([Role.RECRUITER]);

  return (
    <>
      <Header currentRoute={usePathname()} />
        {loading && <Flex height="100vh" align="center" justifyContent="center"><Spinner size='xl' /></Flex>}
      <Footer />
    </>
  );
}
