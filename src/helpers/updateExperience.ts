import axiosInstance from ".";

const updateExperience = async (formData: any) => {
  try {
    const response = await axiosInstance.patch(
      `/applicant/update-applicant-experience/${formData.id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

    return response.status;
  } catch (error) {
    console.error("Error updating applicant experience:", error);
    throw error;
  }
};

export default updateExperience;
