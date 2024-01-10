"use client"
import SpinnerIfLoading from "@/components/shared/SpinnerIfLoading"
import useAuth from "@/hooks/useAuth"
import { Button } from "@chakra-ui/react"

export default function BannerBox() {
    const { auth, loading } = useAuth()
    return (
        <>
            <h1>
                Match your
                <br />
                <span>future</span>
            </h1>
            <SpinnerIfLoading loading={loading}>
                {auth ? (
                    <Button
                        as="a"
                        href="/dashboard"
                        bgColor="#FF8E2B"
                        _hover={{ bgColor: "#fdb16e" }}
                        color="#0D2137"
                        h="32px"
                    >
                        Dashboard
                    </Button>
                ) : (
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
                )}
            </SpinnerIfLoading>
        </>
    )
}
