import { Role } from "@/types/Auth";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useProtectedRoute = (allowedRoles: Role[]) => {
	const { auth, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading) {
			if (!auth) {
				router.push("/signin");
			}

			if (auth && !allowedRoles.includes(auth.role)) {
				router.push(`/${auth.role}`);
			}
		}
	}, [auth, loading]);

	return { auth, loading };
};

export default useProtectedRoute;
