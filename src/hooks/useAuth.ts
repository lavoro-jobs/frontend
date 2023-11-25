import { useContext } from "react"
import AuthContext, { AuthContextType } from "@/context/AuthContext"

const useAuth = (): AuthContextType => {
  const { auth, updateAuth, loading } = useContext(AuthContext)

  if (!auth) {
    updateAuth()
  }

  return { auth, updateAuth, loading }
}

export default useAuth
