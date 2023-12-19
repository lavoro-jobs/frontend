import axiosInstance from ".";

const getApplicantProfile = async () => {
  try {
    const response = await axiosInstance.get("/company/get-company-with-recruiters", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching applicant profile:", error);
    throw error;
  }
};

export default getApplicantProfile;
