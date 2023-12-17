"use client";

import {
  Heading,
  Highlight,
  Flex
} from "@chakra-ui/react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
        <div className="wrapper-404">
          <Header />
          <div className="box-404">
            <Heading fontSize="6xl" lineHeight='tall' paddingTop="180px" w="fit-content" margin="0 auto 20px">
                <Highlight
                  query={['404']}
                  styles={{ px: '2', py: '1', rounded: 'full', bg: '#0071c6', color: "#fff" }}
                >
                  404 Page not found
                </Highlight>
            </Heading>
            <h4>We can't seem to find a page you were looking for.<br/>Have you double checked URL?</h4>
            <Link href="/home" fontSize="xl">Go Home</Link>
          </div>
          <Footer />
        </div>
    </>
  );
}
