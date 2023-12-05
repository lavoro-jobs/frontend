import axiosInstance from ".";
const createJobPost = async (formData: any) => {
  try {
    const response = await axiosInstance.post("/job-post/create-job-post", JSON.stringify(formData), {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.status;
  } catch (error) {
    console.error("Error creating job post:", error);
    throw error;
  }
};
export default createJobPost;
