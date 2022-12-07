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
    tagTypes: ["Profiles"],
    endpoints: (builder) => ({
        getProfiles: builder.query({
            query: () => {
                return {
                    url: `/api/profiles`,
                };
            },
            providesTags: ["Profiles"],
        }),
        addProfile: builder.mutation({
            query: (form) => {
                const formData = new FormData(form);
                const entries = Array.from(formData.entries());
                const data = entries.reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
                if (data.id) {
                    const id = data.id.slice(0, 24);
                    const state = data.id.slice(25);
                    data["id"] = id
                    data[" description"] = data.description
                    data["state"] = state;
                    return {
                        method: "post",
                        url: `/api/profiles`,
                        credentials: "include",
                        body: data,
                    };
                } else {
                    const id = data.id;
                    data["id"] = id;
                    delete data["id"];
                    return {
                        method: "post",
                        url: `/api/profiles`,
                        credentials: "include",
                        body: data,
                    };
                }
            },
            invalidatesTags: ["Profiles"],
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
            query: (form) => {
                const formData = new FormData(form);
                const entries = Array.from(formData.entries());
                const data = entries.reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
                const id = data.id.slice(0, 24);
                const state = data.id.slice(25);
                data["id"] = id
                data[" description"] = data.description
                data["state"] = state;

                delete data["id"];
                const profileId = data["id"];
                console.log(data);
                return {
                    method: "put",
                    url: `/api/profiles/${profileId}`,
                    credentials: "include",
                    body: data,
                };
            },
        }),
    }),
});

export const {
    useGetProfilesQuery,
    useAddProlfiletMutation,
    useDeleteProfileMutation,
    useUpdateProfileMutation,
} = profileApi;
