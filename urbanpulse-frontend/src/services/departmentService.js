import axiosInstance from "../api/axiosConfig";

const departmentService = {
  getAllDepartments: async () => {
    const response = await axiosInstance.get("/departments");
    return response.data;
  },

  createDepartment: async (department) => {
    const response = await axiosInstance.post(
      "/departments",
      department
    );
    return response.data;
  },

  updateDepartment: async (id, department) => {
    const response = await axiosInstance.put(
      `/departments/${id}`,
      department
    );
    return response.data;
  },

  deleteDepartment: async (id) => {
    const response = await axiosInstance.delete(
      `/departments/${id}`
    );
    return response.data;
  }
};

export default departmentService;