import axiosInstance from ".";

const commentApplication = async (formData: any, jobPostId: string, applicantId: string) => {
  try {
    const response = await axiosInstance.post(`/matches/comment-application/${encodeURIComponent(jobPostId)}/${encodeURIComponent(applicantId)}`, JSON.stringify(formData), {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.status;
  } catch (error) {
    console.error("Error commenting application:", error);
    throw error;
  }
};

export default commentApplication;
