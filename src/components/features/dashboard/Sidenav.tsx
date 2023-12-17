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
import { FiSettings, FiMenu, FiSend, FiUserCheck, FiLayers, FiCrosshair, FiHome } from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import Link from "next/link";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import {Role} from "@/types/Auth";
import { useRouter } from "next/navigation";
import signOut from "@/helpers/signOut";
import useAuth from "@/hooks/useAuth";

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}
const ApplicantLinks: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, url: "/" },
  { name: "Profile", icon: FiSettings, url: "/profile" },
  { name: "Matches", icon: FiUserCheck, url: "" },
  { name: "Chats", icon: FiSend, url: "" },
];

const RecruiterLinks: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, url: "/" },
  { name: "Profile", icon: FiSettings, url: "/profile" },
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
      <Box ml={{ base: 0, md: 60 }} p="16px">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { auth } = useProtectedRoute([Role.APPLICANT, Role.RECRUITER]);
  const router = useRouter();
  const { updateAuth } = useAuth();
  let useLinks: Array<LinkItemProps> = [];

  if(auth?.role == Role.APPLICANT) {
    useLinks = ApplicantLinks;
  } else if(auth?.role == Role.RECRUITER) {
    useLinks = RecruiterLinks;
  }

  const handleSignOut = async () => {
    try {
      const response = await signOut();
      if (response.status === 200) {
        localStorage.clear();
        updateAuth();
        router.push("/signIn");
      }
    } catch (err) {
      throw new Error(err,"There was an error logging out. Please try again.");
    }
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
        <Link
          key={link.name}
          href={link.url}
        >
          <NavItem icon={link.icon}>{ link.name }</NavItem>
        </Link>
      ))}
      <Button className="sign-out" onClick={handleSignOut}>Sign out</Button>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
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
