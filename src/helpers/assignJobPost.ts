
import FormState from "@/interfaces/job-posts/post-state-assignees.interface";
import axiosInstance from ".";

const assignJobPost = async (formData: FormState) => {
  try {
    const response = await axiosInstance.post(
      `/company/assign-job-post/${encodeURIComponent(formData.id)}`,
      JSON.stringify(formData.assignees),
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
