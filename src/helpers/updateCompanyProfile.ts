import axiosInstance from ".";

const updateCompanyProfile = async (data: any) => {
  try {
    const response = await axiosInstance.patch("/company/update-company", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.status;
  } catch (error) {
    console.error("Error updating applicant profile:", error);
    throw error;
  }
};

export default updateCompanyProfile;
