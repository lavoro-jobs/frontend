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
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";

export default function Header({ currentRoute }: { currentRoute?: string }) {
  const { auth } = useAuth();
  const [menu, setMenu] = useState<boolean>(false);

  const toggleHamby = () => {
    setMenu(!menu);
  };
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
            <Link href="/jobs">
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
            {!auth && (
              <>
                <Button
                  as="a"
                  href="/signin"
                  bgColor="#E0EAF5"
                  _hover={{ bgColor: "gray.300" }}
                  color="#0D2137"
                  h="32px"
                >
                  Sign in
                </Button>
                <Button
                  as="a"
                  href="/signup"
                  bgColor="#FF8E2B"
                  _hover={{ bgColor: "#fdb16e" }}
                  color="#0D2137"
                  h="32px"
                >
                  Sign up
                </Button>
              </>
            )}
            {auth && (
              <Button
                as="a"
                href="/dashboard"
                bgColor="#E0EAF5"
                _hover={{ bgColor: "gray.300" }}
                color="#0D2137"
                h="32px"
              >
                Dashboard
              </Button>
            )}
          </ButtonGroup>

          <IconButton
            className="hamby"
            marginTop="16px"
            bgColor="transparent"
            _hover={{ bg: "transparent" }}
            onClick={toggleHamby}
            icon={<span className="material-symbols-outlined icon-menu">menu</span>}
          ></IconButton>
          <Drawer isOpen={menu} placement="right" onClose={toggleHamby}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton className="drawer-close" />
              <DrawerHeader className="drawer-title">
                <Link href="/">
                  <h1 className="header-title">Lavoro</h1>
                </Link>
              </DrawerHeader>

              <DrawerBody className="drawer-body">
                <Link href="/">
                  <Text fontSize="3xl" as={currentRoute === "/home" ? "b" : "p"} color="#0071c6">
                    Home
                  </Text>
                </Link>
                <Link href="/jobs">
                  <Text fontSize="3xl" as={currentRoute === "/job-posts" ? "b" : "p"} color="#0071c6">
                    Job posts
                  </Text>
                </Link>
                <Link href="/about-us">
                  <Text fontSize="3xl" as={currentRoute === "/about-us" ? "b" : "p"} color="#0071c6">
                    About us
                  </Text>
                </Link>
              </DrawerBody>
              <DrawerFooter>
                <ButtonGroup>
                  {!auth && (
                    <>
                      <Button
                        as="a"
                        href="/signin"
                        bgColor="#E0EAF5"
                        _hover={{ bgColor: "gray.300" }}
                        color="#0D2137"
                        h="32px"
                      >
                        Sign in
                      </Button>
                      <Button
                        as="a"
                        href="/signup"
                        bgColor="#FF8E2B"
                        _hover={{ bgColor: "#fdb16e" }}
                        color="#0D2137"
                        h="32px"
                      >
                        Sign up
                      </Button>
                    </>
                  )}
                  {auth && (
                    <Button
                      as="a"
                      href="/dashboard"
                      bgColor="#E0EAF5"
                      _hover={{ bgColor: "gray.300" }}
                      color="#0D2137"
                      h="32px"
                    >
                      Dashboard
                    </Button>
                  )}
                </ButtonGroup>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </nav>
      </Flex>
    </header>
  );
}
