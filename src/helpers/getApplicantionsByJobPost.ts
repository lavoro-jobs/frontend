import axiosInstance from ".";

const getApplicationsByJobPost = async (jobPostId: string) => {
  try {
    const response = await axiosInstance.get(`/matches/get-applications-to-job-post/${encodeURIComponent(jobPostId)}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching applicantions:", error);
    throw error;
  }
};

export default getApplicationsByJobPost;
