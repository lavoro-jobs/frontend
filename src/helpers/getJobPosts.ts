import axiosInstance from ".";

const getJobPostsByRecruiter = async () => {
  try {
    const response = await axiosInstance.get("/company/get-job-posts-by-recruiter", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching job posts:", error);
    throw error;
  }
};

export default getJobPostsByRecruiter;