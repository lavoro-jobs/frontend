import axiosInstance from ".";

const rejectApplication = async (jobPostId: string, applicantId: string) => {
  try {
    const response = await axiosInstance.post(`/matches/reject-application/${encodeURIComponent(jobPostId)}/${encodeURIComponent(applicantId)}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.status;
  } catch (error) {
    console.error("Error rejecting application:", error);
    throw error;
  }
};

export default rejectApplication;
