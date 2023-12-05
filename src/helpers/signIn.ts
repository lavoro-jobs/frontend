import axiosInstance from ".";

const signIn = async (formData: any) => {
  const response = await axiosInstance.post("/auth/login", new URLSearchParams(formData), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response;
};

export default signIn;
