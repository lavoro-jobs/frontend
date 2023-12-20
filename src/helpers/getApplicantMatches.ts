import axiosInstance from ".";

const getApplicantProfile = async () => {
  try {
    const response = await axiosInstance.get("/matches/get-matches-by-applicant", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching applicant matches:", error);
    throw error;
  }
};

export default getApplicantProfile;
