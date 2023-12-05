import axiosInstance from ".";

const updateApplicantProfile = async (formData: any) => {
  try {
    const response = await axiosInstance.post("/applicant/update-applicant-profile", JSON.stringify(formData), {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    });

    return response.status;
  } catch (error) {
    console.error('Error updating applicant profile:', error);
    throw error;
  }
};

export default updateApplicantProfile;