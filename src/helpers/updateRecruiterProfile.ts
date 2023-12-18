import axiosInstance from ".";

const updateRecruiterProfile = async (data: any) => {
  try {
    const response = await axiosInstance.patch("/company/update-recruiter-profile", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.status;
  } catch (error) {
    console.error("Error updating recruiter profile:", error);
    throw error;
  }
};

export default updateRecruiterProfile;
