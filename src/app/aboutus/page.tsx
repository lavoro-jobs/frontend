'use client'

import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import { usePathname } from 'next/navigation'
import { Box } from '@chakra-ui/react'

export default function AboutUs() {
  return (
    <>
    <Header currentRoute={usePathname()}/>
    <Box h="100vh" bgColor="#E0EAF5">about us</Box>
    <Footer />
    </>
  )
}
