import axiosInstance from ".";

const getCurrentRecruiterProfile = async () => {
  try {
    const response = await axiosInstance.get("/company/get-recruiter-profile", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recruiter profile:", error);
    throw error;
  }
};

export default getCurrentRecruiterProfile;
