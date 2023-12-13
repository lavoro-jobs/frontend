import axiosInstance from ".";

const joinCompany = async (formData: any, inviteToken: string) => {
    const response = await axiosInstance.post(
        `/company/join-company/${encodeURIComponent(inviteToken)}`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

  return response;
};

export default joinCompany;
