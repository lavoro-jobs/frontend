import axiosInstance from ".";

const getApplicantProfile = async () => {
  try {
    const response = await axiosInstance.get(
      "/applicant/get-applicant-profile",
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching applicant profile:', error);
    throw error;
  }
};

export default getApplicantProfile;