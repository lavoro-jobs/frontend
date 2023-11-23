const getUserProfile = async () => {
  const response = await fetch("http://localhost:8000/api/v1/auth/account/current", {
    method: "GET",
    credentials: "include",
  })

  return response
}

export default getUserProfile
