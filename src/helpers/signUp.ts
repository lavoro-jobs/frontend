import axiosInstance from "."

const signUp = async (formData: any) => {
  const response = await axiosInstance.post("http://localhost:8000/api/v1/auth/register", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData),
  })

  return response
}

export default signUp
