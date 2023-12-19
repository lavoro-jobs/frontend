import axiosInstance from ".";

const createExperiences = async (form_data: any) => {
  try {
    const response = await axiosInstance.post(
      "/applicant/create-experiences",
      form_data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.status;
  } catch (error) {
    console.error("Error creating experience:", error);
    throw error;
  }
};

export default createExperiences;
