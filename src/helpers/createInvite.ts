import axiosInstance from ".";

const createInvite = async (email: string) => {
	try {
		const response = await axiosInstance.post(`/company/invite-recruiter/${encodeURIComponent(email)}`, {}, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});

		return response;
	} catch (error) {
		console.error("Error creating invite:", error);
		throw error;
	}
};

export default createInvite;
