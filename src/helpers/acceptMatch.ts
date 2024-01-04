import axiosInstance from ".";

const acceptMatch = async (jobPostId: any) => {
  try {
    const response = await axiosInstance.post(`/matches/create-application/${encodeURIComponent(jobPostId)}`,
      {},
      {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.status;
  } catch (error) {
    console.error("Error accepting match", error);
    throw error;
  }
};

export default acceptMatch;
