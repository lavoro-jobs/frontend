import axiosInstance from ".";

const assignJobPost = async (id: any, formData: any) => {
  try {
    const response = await axiosInstance.post(
      `/company/assign-job-post/${encodeURIComponent(id)}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.status;
  } catch (error) {
    console.error("Error assigning job post:", error);
    throw error;
  }
};

export default assignJobPost;
