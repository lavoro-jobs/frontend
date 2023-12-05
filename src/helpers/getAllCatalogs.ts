import axiosInstance from ".";

const getAllCatalogs = async () => {
  try {
    const response = await axiosInstance.get("/config/get-all-catalogs", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching catalogs:", error);
    throw error;
  }
};

export default getAllCatalogs;
