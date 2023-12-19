import axiosInstance from ".";

const getRecruitersAndCompany = async () => {
  try {
    const response = await axiosInstance.get("/company/get-company-with-recruiters", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching recruiters and company:", error);
    throw error;
  }
};

export default getRecruitersAndCompany;