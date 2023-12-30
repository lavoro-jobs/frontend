import axiosInstance from ".";

const rejectMatch = async (jobPostId: any) => {
  try {
    const response = await axiosInstance.post(`/matches/reject-match/${encodeURIComponent(jobPostId)}`,
        {},
        {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.status;
  } catch (error) {
    console.error("Error rejecting match", error);
    throw error;
  }
};

export default rejectMatch;
