"use client"

import {Flex, Heading} from "@chakra-ui/react";
import React from "react";
import Sidenav from "@/components/features/dashboard/Sidenav";

export default function RecruiterDashboard() {

  return (
    <div>
      <Sidenav>
        <Flex align="center" padding="100px 0" justify="center" direction="column" bg="#E0EAF5">
          <Heading marginBottom="32px" maxW="512px" textAlign="center" color="#0D2137">
            Recruiter dashboard
          </Heading>
        </Flex>
      </Sidenav>
    </div>
  );
}