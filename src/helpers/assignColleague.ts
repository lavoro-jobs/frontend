import axiosInstance from ".";

const assignColleague = async (email: string) => {
	try {
		const response = await axiosInstance.post(
			`/job-post/assign-colleague/${encodeURIComponent(email)}`,
			{},
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);

		return response;
	} catch (error) {
		console.error("Error with assigning colleague:", error);
		throw error;
	}
};

export default assignColleague;
