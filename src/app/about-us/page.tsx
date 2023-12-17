"use client";
import {
  Heading,
  Highlight,
  Button,
  Flex
} from "@chakra-ui/react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { usePathname } from "next/navigation";

export default function AboutUs() {
  return (
    <>
      <Header currentRoute={usePathname()} />
      <Heading fontSize="6xl" lineHeight='tall' paddingTop="150px" w="fit-content" margin="0 auto 20px">
        <Highlight
          query={['your place']}
          styles={{ px: '2', py: '1', rounded: 'full', bg: '#0071c6', color: "#fff" }}
        >
          We've been in your place
        </Highlight>
      </Heading>
      <div className="about-us-subtitle">
          <h2>
            After years of experience, we've seen it all!
            <br/>
            From bad matching algorithms to useless job posts. It's time to make a difference.
          </h2>
          <Button as="a" href="/job-posts" bgColor="#FF8E2B" _hover={{ bgColor: "#fdb16e" }} color="#0D2137" h="32px">
            See our job posts
          </Button>
      </div>

      <Flex  className="about-us-details" alignItems="flex-start" justifyContent="space-between" w="80%" margin="0 auto 100px">
        <div>
            <Heading className="secondary-heading" fontSize="4xl" lineHeight='tall'  w="fit-content" margin="0 0 20px">
                <Highlight
                  query={['project']}
                  styles={{ px: '2', py: '1', rounded: 'full', bg: '#0071c6', color: "#fff" }}
                >
                  Started as a project
                </Highlight>
            </Heading>
            <p>Originating as a distinguished project incubated at FER, University of Zagreb, Lavoro embodies the fusion of academic rigor and entrepreneurial vision.<br/><br/>Our roots trace back to the esteemed halls of the university, where our journey commenced as an ambitious endeavor fueled by innovation and driven by the quest for redefining the recruitment landscape.<br/><br/>From humble beginnings as a university project, we've evolved into a pioneering force in the software development recruitment sphere, leveraging the knowledge, expertise, and dedication fostered within the academic corridors to shape a platform that harmonizes talent and opportunity on a global scale.</p>
        </div>
        <img src="/assets/images/team.jpg"/>
      </Flex>
      <Footer />
    </>
  );
}
