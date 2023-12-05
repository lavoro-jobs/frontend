import axiosInstance from ".";

const createRecruiterProfile = async (formData: any) => {
  try {
    const response = await axiosInstance.post("/company/create-recruiter-profile", JSON.stringify(formData), {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.error("Error creating recruiter profile:", error);
    throw error;
  }
};

export default createRecruiterProfile;
