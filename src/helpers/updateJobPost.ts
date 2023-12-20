import axiosInstance from ".";

const updateJobPost = async (formData: any) => {
  try {
    const response = await axiosInstance.patch(`/company/update-job-post/${encodeURIComponent(formData.id)}`, JSON.stringify(formData), {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.status;
  } catch (error) {
    console.error("Error updating job post:", error);
    throw error;
  }
};

export default updateJobPost;
