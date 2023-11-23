import axiosInstance from "."

const signUp = async (formData: any) => {
  const response = await axiosInstance.post("/auth/register", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData),
  })

  return response
}

export default signUp
