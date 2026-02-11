import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers;
    },
  }),
  tagTypes: ['Channels', 'Messages'],
  endpoints: (builder) => ({

    getChannels: builder.query({
      query: () => '/channels',
      providesTags: ['Channels'],
    }),

    getMessages: builder.query({
      query: () => '/messages',
      providesTags: ['Messages'],
    }),

    addChannel: builder.mutation({
      query: (channel) => ({
        url: '/channels',
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channels'],
    }),

    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['Channels'],
    }),

    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels', 'Messages'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: '/messages',
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
})

export const {
  useGetChannelsQuery,
  useGetMessagesQuery,
  useAddChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
  useAddMessageMutation,
} = chatApi
