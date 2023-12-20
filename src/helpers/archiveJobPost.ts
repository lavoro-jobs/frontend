import axiosInstance from ".";

const archiveJobPost = async (id: any) => {
  try {
    const response = await axiosInstance.patch(`/company/soft-delete-job-post/${encodeURIComponent(id)}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.status;
  } catch (error) {
    console.error("Error archiving job post:", error);
    throw error;
  }
};

export default archiveJobPost;
