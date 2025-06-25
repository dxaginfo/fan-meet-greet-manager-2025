import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';
import { User } from '../slices/authSlice';

// Define base API
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1',
    prepareHeaders: (headers, { getState }) => {
      // Get token from state
      const token = (getState() as RootState).auth.token;
      
      // If token exists, add to headers
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['User', 'Event', 'Ticket', 'Merchandise'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<
      { user: User; token: string; refreshToken: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: { data: { user: User; token: string; refreshToken: string } }) => response.data,
    }),
    
    register: builder.mutation<
      { message: string },
      { email: string; password: string; firstName: string; lastName: string; role: string }
    >({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    
    refreshToken: builder.mutation<
      { token: string; refreshToken: string },
      { refreshToken: string }
    >({
      query: (data) => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: { data: { token: string; refreshToken: string } }) => response.data,
    }),
    
    // User endpoints
    getProfile: builder.query<User, void>({
      query: () => '/users/profile',
      transformResponse: (response: { data: User }) => response.data,
      providesTags: ['User'],
    }),
    
    updateProfile: builder.mutation<
      User,
      Partial<User>
    >({
      query: (userData) => ({
        url: '/users/profile',
        method: 'PUT',
        body: userData,
      }),
      transformResponse: (response: { data: User }) => response.data,
      invalidatesTags: ['User'],
    }),
    
    // Event endpoints
    getEvents: builder.query<
      { events: any[]; pagination: any },
      { page?: number; limit?: number; artistId?: string; status?: string; startDate?: string; endDate?: string }
    >({
      query: (params) => ({
        url: '/events',
        params,
      }),
      transformResponse: (response: { data: { events: any[]; pagination: any } }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.events.map(({ id }) => ({ type: 'Event' as const, id })),
              { type: 'Event', id: 'LIST' },
            ]
          : [{ type: 'Event', id: 'LIST' }],
    }),
    
    getEvent: builder.query<any, string>({
      query: (id) => `/events/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: (result, error, id) => [{ type: 'Event', id }],
    }),
    
    createEvent: builder.mutation<any, any>({
      query: (eventData) => ({
        url: '/events',
        method: 'POST',
        body: eventData,
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: [{ type: 'Event', id: 'LIST' }],
    }),
    
    updateEvent: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/events/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: (result, error, { id }) => [
        { type: 'Event', id },
        { type: 'Event', id: 'LIST' },
      ],
    }),
    
    deleteEvent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Event', id: 'LIST' }],
    }),
    
    // Ticket endpoints
    getTickets: builder.query<
      { tickets: any[]; pagination: any },
      { page?: number; limit?: number; userId?: string; eventId?: string; status?: string }
    >({
      query: (params) => ({
        url: '/tickets',
        params,
      }),
      transformResponse: (response: { data: { tickets: any[]; pagination: any } }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.tickets.map(({ id }) => ({ type: 'Ticket' as const, id })),
              { type: 'Ticket', id: 'LIST' },
            ]
          : [{ type: 'Ticket', id: 'LIST' }],
    }),
    
    getTicket: builder.query<any, string>({
      query: (id) => `/tickets/${id}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: (result, error, id) => [{ type: 'Ticket', id }],
    }),
    
    purchaseTicket: builder.mutation<any, any>({
      query: (ticketData) => ({
        url: '/tickets/purchase',
        method: 'POST',
        body: ticketData,
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: [{ type: 'Ticket', id: 'LIST' }, { type: 'Event', id: 'LIST' }],
    }),
    
    // Merchandise endpoints
    getMerchandiseList: builder.query<
      { merchandise: any[]; pagination: any },
      { page?: number; limit?: number; eventId?: string }
    >({
      query: (params) => ({
        url: '/merchandise',
        params,
      }),
      transformResponse: (response: { data: { merchandise: any[]; pagination: any } }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.merchandise.map(({ id }) => ({ type: 'Merchandise' as const, id })),
              { type: 'Merchandise', id: 'LIST' },
            ]
          : [{ type: 'Merchandise', id: 'LIST' }],
    }),
    
    createMerchandiseOrder: builder.mutation<any, any>({
      query: (orderData) => ({
        url: '/merchandise/order',
        method: 'POST',
        body: orderData,
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: [
        { type: 'Merchandise', id: 'LIST' },
        { type: 'Ticket', id: 'LIST' },
      ],
    }),
  }),
});

// Export hooks
export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetTicketsQuery,
  useGetTicketQuery,
  usePurchaseTicketMutation,
  useGetMerchandiseListQuery,
  useCreateMerchandiseOrderMutation,
} = api;