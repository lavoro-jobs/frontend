"use client";
import axiosInstance from ".";

const createApplicantProfile = async (formData: any) => {
  try {
    const response = await axiosInstance.post("/applicant/create-applicant-profile", JSON.stringify(formData), {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.status;
  } catch (error) {
    console.error("Error creating applicant profile:", error);
    throw error;
  }
};

export default createApplicantProfile;
