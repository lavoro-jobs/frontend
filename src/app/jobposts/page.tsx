'use client'

import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import { usePathname } from 'next/navigation'
import { Box } from '@chakra-ui/react'

export default function JobPosts() {
  return (
    <>
    <Header currentRoute={usePathname()}/>
    <Box h="100vh" bgColor="#E0EAF5">job posts</Box>
    <Footer />
    </>
  )
}
