import axiosInstance from "."

const getUserProfile = async () => {
  const response = await axiosInstance.get("http://localhost:8000/api/v1/auth/account/current")
  return response
}

export default getUserProfile
