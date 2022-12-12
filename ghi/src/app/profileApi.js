import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api";


export const profileApi = createApi({
    reducerPath: "profiles",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
        prepareHeaders: (headers, { getState }) => {
            const selector = apiSlice.endpoints.getToken.select();
            const { data: tokenData } = selector(getState());
            if (tokenData && tokenData.access_token) {
                headers.set(
                    "Authorization",
                    `${tokenData.token_type} ${tokenData.access_token}`
                );

            }
            return headers;
        },

    }),
    tagTypes: ["Profiles, Token"],
    endpoints: (builder) => ({
        getProfiles: builder.query({
            query: () => {
                return {
                    url: `/api/profiles/`,
                    credentials: 'include',


                };
            },
            providesTags: ["Profiles"],
        }),
        getOneProfile: builder.query({
            query: (profileId) => {
                return {
                    method: "get",
                    url: `/api/profiles/${profileId}`,
                    credentials: "include",

                };
            },
            invalidatesTags: ["Profiles"],
        }),
        addProfile: builder.mutation({
            query: (data) => ({
                url: "/api/profiles",
                method: "post",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: [""],
        }),
        deleteProfile: builder.mutation({
            query: (profileId) => {
                return {
                    method: "delete",
                    url: `/api/profiles/${profileId}`,
                };
            },
            invalidatesTags: ["Profiles"],
        }),
        updateProfile: builder.mutation({
            query: (profileId, body) => ({
                url: `/api/profiles/${profileId}`,
                method: "put",
                credentials: "include",
                body: body,
            }),
            invalidatesTags: ["Profiles"],
        }),
    }),
});

export const {
    useGetOneProfileQuery,
    useGetProfilesQuery,
    useAddProlfiletMutation,
    useDeleteProfileMutation,
    useUpdateProfileMutation,
} = profileApi;
