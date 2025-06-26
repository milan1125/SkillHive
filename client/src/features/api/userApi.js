import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USERS_API = "http://localhost:8000/api/v1/user";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: USERS_API,
    credentials: "include",
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
