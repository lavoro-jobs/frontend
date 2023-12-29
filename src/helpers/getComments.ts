import axiosInstance from ".";

const getComments = async (jobPostId: string, applicantId: string) => {
  try {
    const response = await axiosInstance.get(
      `/matches/get-comments-on-application/${encodeURIComponent(jobPostId)}/${encodeURIComponent(applicantId)}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export default getComments;
