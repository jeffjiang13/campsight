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
            query: (form) => {
                const formData = new FormData(form);
                const entries = Array.from(formData.entries());
                const data = entries.reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
                if (data.id) {
                    const id = data.id.slice(0, 24);
                    const location = data.id.slice(25);
                    data["id"] = id
                    data[" description"] = data.description
                    data["location"] = location;
                    data["date"] = data.date + "T00:00:00.000Z";
                    return {
                        method: "post",
                        url: `/api/events`,
                        credentials: "include",
                        body: data,
                    };
                } else {
                    const id = data.id;
                    data["id"] = id;
                    delete data["id"];
                    return {
                        method: "post",
                        url: `/api/events`,
                        credentials: "include",
                        body: data,
                    };
                }
            },
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
            query: (form) => {
                const formData = new FormData(form);
                const entries = Array.from(formData.entries());
                const data = entries.reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
                const id = data.id.slice(0, 24);
                const location = data.id.slice(25);
                data["id"] = id;
                data[" description"] = data.description
                data["location"] = location;
                data["date"] = data.date + "T00:00:00.000Z";
                delete data["id"];
                const eventId = data["id"];
                return {
                    method: "put",
                    url: `/api/events/${eventId}`,
                    credentials: "include",
                    body: data,
                };
            },
        }),
    }),
});

export const {
    useGetEventsQuery,
    useAddEventMutation,
    useDeleteEventMutation,
    useUpdateEventMutation,
} = eventApi;
