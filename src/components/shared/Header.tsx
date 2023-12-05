import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function Header({ currentRoute }: { currentRoute?: string }) {
  return (
    <header>
      <Flex h="100%" justify="space-between" align="stretch">
        <Link href="/">
          <h1 className="header-title">Lavoro</h1>
        </Link>
        <nav>
          <div className="nav-esthetic"></div>
          <Flex gap="24px" align="center">
            <Link href="/">
              <Text fontSize="lg" as={currentRoute === "/home" ? "b" : "p"} color="#fff">
                Home
              </Text>
            </Link>
            <Link href="/job-posts">
              <Text fontSize="lg" as={currentRoute === "/job-posts" ? "b" : "p"} color="#fff">
                Job posts
              </Text>
            </Link>
            <Link href="/about-us">
              <Text fontSize="lg" as={currentRoute === "/about-us" ? "b" : "p"} color="#fff">
                About us
              </Text>
            </Link>
          </Flex>

          <ButtonGroup>
            <Button as="a" href="/signin" bgColor="#E0EAF5" _hover={{ bgColor: "gray.300" }} color="#0D2137" h="32px">
              Sign in
            </Button>
            <Button as="a" href="/signup" bgColor="#FF8E2B" _hover={{ bgColor: "#fdb16e" }} color="#0D2137" h="32px">
              Sign up
            </Button>
          </ButtonGroup>

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<span className="material-symbols-outlined">menu</span>}
              color="#0D2137"
              variant="unstyled"
            />
            <MenuList>
              <MenuItem as="a" href="/">
                Home
              </MenuItem>
              <MenuItem as="a" href="/job-posts">
                Job posts
              </MenuItem>
              <MenuItem as="a" href="/about-us">
                About us
              </MenuItem>
              <MenuDivider />
              <MenuItem as="a" href="/signin">
                Sign in
              </MenuItem>
              <MenuItem as="a" href="/signup">
                Sign up
              </MenuItem>
            </MenuList>
          </Menu>
        </nav>
      </Flex>
    </header>
  );
}
