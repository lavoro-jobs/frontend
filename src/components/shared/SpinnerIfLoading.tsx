import { Spinner } from "@chakra-ui/react"

export default function SpinnerIfLoading({ loading, children }: { loading: boolean; children: React.ReactNode }) {
    if (loading) {
        return <Spinner />
    }
    return <>{children}</>
}
