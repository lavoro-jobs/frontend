import { Heading, Flex, ButtonGroup, Container, IconButton, Stack, Text } from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <Container className="footer" bgColor="#0071c6" w="100%" as="footer" role="contentinfo">
    <Flex align="center" justify="space-between">
        <Stack spacing={{ base: '4', md: '5' }}>
          <Stack justify="space-between" direction="row" align="center">
            <Link href="/">
              <h1 className="footer-title">Lavoro</h1>
            </Link>
          </Stack>
          <Text fontSize="sm" color="#fff">
            &copy; {new Date().getFullYear()} Lavoro
          </Text>
        </Stack>
        <div className="footer-right">
            <Flex gap="16px" justify="center">
                <Link href="/job-posts">
                  <Text fontSize="xl" color="#fff">
                    Job posts
                  </Text>
                </Link>
                <Link href="/about-us">
                  <Text fontSize="xl" color="#fff">
                    About us
                  </Text>
                </Link>
            </Flex>
            <ButtonGroup className="footer-icons" variant="tertiary">
              <IconButton as="a" href="#" color="#fff" aria-label="LinkedIn" icon={<FaLinkedin />} />
              <IconButton as="a" href="#" color="#fff" aria-label="GitHub" icon={<FaGithub />} />
              <IconButton as="a" href="#" color="#fff" aria-label="Twitter" icon={<FaTwitter />} />
            </ButtonGroup>
        </div>
      </Flex>
    </Container>
  );
}
