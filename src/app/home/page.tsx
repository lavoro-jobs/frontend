import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"
import Image from "next/image"
import FeaturedJobPosts from "@/components/features/home/FeaturedJobPosts"
import BannerBox from "@/components/features/home/BannerBox"
import { Button } from "@chakra-ui/react"

export default function Home() {
  return (
    <>
      <Header />
      <div className="homepage-banner-wrapper">
        <div className="homepage-banner-container">
          <Image alt="banner" src="/assets/images/banner.jpg" width="1000" height="1000" />
          <div className="homepage-banner-box">
            <BannerBox />
          </div>
        </div>
      </div>
      <div className="homepage-highlights-wrapper">
        <h2>Matching impact</h2>
        <div className="homepage-highlights-container">
          <div className="homepage-highlights-box">
            <h3>+1.000</h3>
            <p>daily matches</p>
          </div>
          <div className="homepage-highlights-box">
            <h3>+100.000</h3>
            <p>users</p>
          </div>
          <div className="homepage-highlights-box">
            <h3>+10.000</h3>
            <p>recruiters</p>
          </div>
          <div className="homepage-highlights-box">
            <h3>11</h3>
            <p>countries</p>
          </div>
        </div>
      </div>
      <div className="homepage-jobs-wrapper">
        <FeaturedJobPosts />
      </div>
      <div className="homepage-matching-wrapper">
        <div className="homepage-matching-container">
          <div className="homepage-matching-box">
            <div className="homepage-matching-background">
              <h1>
                How&nbsp;
                <br />
                <span>it works</span>
              </h1>
              <p>
                See how our ML algorithm
                <br />
                shapes your future
              </p>
            </div>
            <Button as="a" href="/signup" bgColor="#FF8E2B" _hover={{ bgColor: "#fdb16e" }} color="#0D2137" h="32px">
              Discover
            </Button>
          </div>
          <Image alt="matching" src="/assets/images/matching.jpg" width="1000" height="1000" />
        </div>
      </div>
      <Footer />
    </>
  )
}
