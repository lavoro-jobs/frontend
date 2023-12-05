"use client";

import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
} from "@chakra-ui/react";
import { FiSettings, FiMenu, FiSend, FiUserCheck, FiLayers, FiCrosshair } from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import Link from "next/link";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import {Role} from "@/types/Auth";

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}
const ApplicantLinks: Array<LinkItemProps> = [
  { name: "Profile", icon: FiSettings, url: "" },
  { name: "Matches", icon: FiUserCheck, url: "" },
  { name: "Chats", icon: FiSend, url: "" },
];

const RecruiterLinks: Array<LinkItemProps> = [
  { name: "Profile", icon: FiSettings, url: "" },
  { name: "Company", icon: FiLayers, url: "" },
  { name: "Job Posts", icon: FiCrosshair, url: "/job-posts" },
  { name: "Matches", icon: FiUserCheck, url: "" },
  { name: "Chats", icon: FiSend, url: "" },
];

export default function Sidenav({ children }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box className="sidenav" minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER])
  let useLinks: Array<LinkItemProps> = [];

  if(auth?.role == Role.APPLICANT) {
    useLinks = ApplicantLinks;
  } else if(auth?.role == Role.RECRUITER) {
    useLinks = RecruiterLinks;
  }

  return (
    <Box
      className="sidenav-menu"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="4" justifyContent="space-between">
        <Link className="title-link" href="/">
          <h1 className="header-title">Lavoro</h1>
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {useLinks?.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      <Button className="sign-out">Sign out</Button>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box as="a" href="#" style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#0071c6",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
