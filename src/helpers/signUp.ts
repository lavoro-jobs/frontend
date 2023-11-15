const signUp = async (formData: any) => {
  const response = await fetch("http://localhost:8000/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData),
  })

  return response
}

export default signUp
