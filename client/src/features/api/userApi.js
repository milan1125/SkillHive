import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "@/config/firebase";

const USERS_API = "https://skill-hive-drab.vercel.app/api/v1/user";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: USERS_API,
    credentials: "include",
    prepareHeaders: async (headers) => {
      try {
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          headers.set('Authorization', `Bearer ${token}`);
        }
      } catch (error) {
        console.error('Error getting Firebase token:', error);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    // Admin endpoints for user management
    getAllUsers: builder.query({
      query: () => "/admin/users",
      providesTags: ["Users"],
    }),
    getUserStats: builder.query({
      query: () => "/admin/users/stats",
      providesTags: ["Users"],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/admin/users/${userId}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserStatsQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApi;
