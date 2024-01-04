import axiosInstance from ".";

const deleteJobPost = async (id: any) => {
  try {
    const response = await axiosInstance.delete(`/company/delete-job-post/${encodeURIComponent(id)}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.status;
  } catch (error) {
    console.error("Error deleting job post:", error);
    throw error;
  }
};

export default deleteJobPost;
