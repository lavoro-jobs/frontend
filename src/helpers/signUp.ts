import axiosInstance from ".";

const signUp = async (formData: any) => {
  const response = await axiosInstance.post("/auth/register", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response;
};

export default signUp;
