import axiosInstance from ".";

const approveApplication = async (jobPostId: string, applicantId: string) => {
  try {
    const response = await axiosInstance.post(`/matches/approve-application/${encodeURIComponent(jobPostId)}/${encodeURIComponent(applicantId)}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.status;
  } catch (error) {
    console.error("Error approving application:", error);
    throw error;
  }
};

export default approveApplication;
