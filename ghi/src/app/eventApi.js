import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
    reducerPath: "events",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_ACCOUNTS_API_HOST,
    }),
    tagTypes: ["Events"],
    endpoints: (builder) => ({
        getEvents: builder.query({
            query: () => {
                return {
                    url: `/api/events`,
                };
            },
            providesTags: ["Events"],
        }),
        addEvent: builder.mutation({
            query: (data) => ({
                url: "/api/events",
                method: "post",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Events"],
        }),
        deleteEvent: builder.mutation({
            query: (eventId) => {
                return {
                    method: "delete",
                    url: `/api/events/${eventId}`,
                };
            },
            invalidatesTags: ["Events"],
        }),
        updateEvent: builder.mutation({
            query: (eventId) => ({
                url: `/api/events/${eventId}`,
                method: "put",
                credentials: "include",
            }),
            invalidatesTags: ["Events"],
        }),
    }),
});

export const {
    useGetEventsQuery,
    useAddEventMutation,
    useDeleteEventMutation,
    useUpdateEventMutation,
} = eventApi;
