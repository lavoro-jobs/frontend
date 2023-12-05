import axiosInstance from ".";

const confirmEmail = async (verificationToken: string) => {
	const response = await axiosInstance.post(`/auth/register/confirm/${verificationToken}`);
	return response;
};

export default confirmEmail;
