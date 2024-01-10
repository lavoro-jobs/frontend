"use client"
import { createContext, useEffect, useState, ReactNode, useCallback } from "react"
import getCurrentUser from "@/helpers/getCurrentUser"
import Auth from "@/types/Auth"
import { Flex, Spinner } from "@chakra-ui/react"

interface AuthContextType {
    auth: Auth | null
    loading: boolean
    updateAuth: () => void
}

const AuthContext = createContext<AuthContextType>({
    auth: null,
    loading: true,
    updateAuth: () => {},
})

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<Auth | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchAuth = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await getCurrentUser()
            const user: Auth = data
            setAuth(user)
        } catch (err) {
            setAuth(null)
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        fetchAuth()
    }, [])

    return <AuthContext.Provider value={{ auth, loading, updateAuth: fetchAuth }}>{children}</AuthContext.Provider>
}

export default AuthContext
export type { AuthContextType }
