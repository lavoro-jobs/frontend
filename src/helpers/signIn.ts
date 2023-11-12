const signIn = async (formData: any) => {
  const response = await fetch("http://localhost:8000/api/v1/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData),
  })

  return response
}

export default signIn
