import axiosInstance from "../api/axiosConfig";

const authService = {
  // Handles backend login request for the user
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
