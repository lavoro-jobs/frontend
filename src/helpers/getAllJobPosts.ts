import axiosInstance from ".";

const getAllJobPosts = async (count: number) => {
  try {
    const response = await axiosInstance.get(`/company/get-random-job-posts/${count}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching job posts:", error);
    throw error;
  }
};

export default getAllJobPosts;