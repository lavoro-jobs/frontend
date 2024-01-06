import axiosInstance from ".";

const deleteComment = async (jobPostId: string, commentId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/matches/delete-comment/${encodeURIComponent(jobPostId)}/${encodeURIComponent(commentId)}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export default deleteComment;
