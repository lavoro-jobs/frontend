import { Role } from "@/types/Auth"
import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

const useProtectedRoute = (allowedRoles: Role[]) => {
  const { auth, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return { auth, loading }
  }

  if (!auth) {
    router.push("/signin")
  } else {
    const hasAccess = allowedRoles.includes(auth.role)
    if (!hasAccess) {
      router.push(`/${auth.role}`)
    }
  }

  return { auth, loading }
}

export default useProtectedRoute
