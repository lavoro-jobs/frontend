import axiosInstance from ".";

const createCompanyProfile = async (formData: any) => {
	try {
		const response = await axiosInstance.post("/company/create-company", JSON.stringify(formData), {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});

		return response;
	} catch (error) {
		console.error("Error creating company profile:", error);
		throw error;
	}
};

export default createCompanyProfile;
