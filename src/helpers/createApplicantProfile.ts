import axiosInstance from "."

const createApplicantProfile = async (formData: any) => {
  const response = await axiosInstance.post("/applicant/profile", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData),
  })

  return response
}

export default createApplicantProfile
