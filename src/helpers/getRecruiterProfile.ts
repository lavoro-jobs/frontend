import axiosInstance from ".";

const getRecruiterProfile = async () => {
  try {
    const response = await axiosInstance.get("/company/get-recruiter-profile", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
        return null;
    } else {
        console.error("Error fetching recruiter profile:", error);
        throw error;
    }
  }
};

export default getRecruiterProfile;
