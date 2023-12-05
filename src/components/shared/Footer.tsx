import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <Box p="16px" bgColor="#0071c6" textAlign="center">
      <Link href="/">
        <Heading fontSize="3xl" color="#0D2137">
          LAVORO
        </Heading>
      </Link>
      <Flex gap="16px" justify="center">
        <Link href="/job-posts">
          <Text fontSize="lg" color="#0D2137">
            Job posts
          </Text>
        </Link>
        <Link href="/about-us">
          <Text fontSize="lg" color="#0D2137">
            About us
          </Text>
        </Link>
      </Flex>
      {/*replace with facebook, instagram, youtube, twitter... icons*/}
      <Flex gap="16px" p="16px" justify="center">
        <span className="material-symbols-outlined">stadia_controller</span>
        <span className="material-symbols-outlined">g_translate</span>
        <span className="material-symbols-outlined">shop</span>
        <span className="material-symbols-outlined">nest_heat_link_gen_3</span>
        <span className="material-symbols-outlined">nest_display</span>
      </Flex>
      <Text>© 2023. Lavoro</Text>
    </Box>
  );
}
