
import api from "@/api/axios";
import type { UserListResponse } from "@/types/user.types";

export const userService = {
  getAll: async (params?: { limit?: number; skip?: number }) => {
    const response = await api.get<UserListResponse>("/users", {
      params,
    });
    return response.data;
  },
};
