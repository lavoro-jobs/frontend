const confirmEmail = async (verificationToken: string) => {
  const response = await fetch(`http://localhost:8000/api/v1/auth/register/confirm/${verificationToken}`, {
    method: "POST",
  })
  return response
}

export default confirmEmail
