import axiosInstance from ".";

const unassignJobPost = async (jobPostId: any, id: any) => {
  try {
    const response = await axiosInstance.delete(
      `/company/unassign-job-post/${encodeURIComponent(jobPostId)}/${encodeURIComponent(id)}`,
    {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.status;
  } catch (error) {
    console.error("Error unassigning job post:", error);
    throw error;
  }
};

export default unassignJobPost;
