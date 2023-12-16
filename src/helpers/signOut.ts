import axiosInstance from ".";

const signOut = async () => {
  const response = await axiosInstance.post("/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export default signOut;
