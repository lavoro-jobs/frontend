import axiosInstance from ".";

const getUserProfile = async () => {
	const response = await axiosInstance.get("/auth/account/current");
	return response;
};

export default getUserProfile;
