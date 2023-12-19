import axiosInstance from ".";

const deleteExperience = async (id: any) => {
  try {
    const response = await axiosInstance.delete(`/applicant/delete-applicant-experience/${encodeURIComponent(id)}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.status;
  } catch (error) {
    console.error("Error deleting experience!", error);
    throw error;
  }
};

export default deleteExperience;
