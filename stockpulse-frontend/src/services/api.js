import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create the API
export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api', // Ensure this base URL points to your backend server
    prepareHeaders: (headers) => {
      // Optionally add headers like authorization tokens
      const token = localStorage.getItem('token'); // Example for JWT
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Authentication endpoints
    signup: builder.mutation({
      query: (user) => ({
        url: '/auth/register',
        method: 'POST',
        body: user,
      }),
    }),

    login: builder.mutation({
      query: (user) => ({
        url: '/auth/login',
        method: 'POST',
        body: user,
      }),
    }),

    // Component-related endpoints
    getComponents: builder.query({
      query: () => '/components',
    }),

    addComponent: builder.mutation({
      query: (component) => ({
        url: '/components',
        method: 'POST',
        body: component,
      }),
    }),

    updateComponent: builder.mutation({
      query: ({ id, component }) => ({
        url: `/components/${id}`,
        method: 'PUT',
        body: component,
      }),
    }),

    deleteComponent: builder.mutation({
      query: (id) => ({
        url: `/components/${id}`,
        method: 'DELETE',
      }),
    }),

    getLowStockComponents: builder.query({
      query: () => '/low-stocks/low-stock',
    }),

    // Purchase-related endpoints
    getPurchases: builder.query({
      query: () => '/purchases',
    }),

    addPurchase: builder.mutation({
      query: (purchase) => ({
        url: '/purchases',
        method: 'POST',
        body: purchase,
      }),
    }),

    updatePurchase: builder.mutation({
      query: ({ id, purchase }) => ({
        url: `/purchases/${id}`,
        method: 'PUT',
        body: purchase,
      }),
    }),

    deletePurchase: builder.mutation({
      query: (id) => ({
        url: `/purchases/${id}`,
        method: 'DELETE',
      }),
    }),

    // Lending-related endpoints
    getLendings: builder.query({
      query: () => '/lendings',
    }),

    addLending: builder.mutation({
      query: (lending) => ({
        url: '/lendings',
        method: 'POST',
        body: lending,
      }),
    }),

    updateLending: builder.mutation({
      query: ({ id, lending }) => ({
        url: `/lendings/${id}`,
        method: 'PUT',
        body: lending,
      }),
    }),

    deleteLending: builder.mutation({
      query: (id) => ({
        url: `/lendings/${id}`,
        method: 'DELETE',
      }),
    }),

    // BoM-related endpoints
    createCircuit: builder.mutation({
      query: (circuitData) => ({
        url: '/bom',
        method: 'POST',
        body: circuitData,
      }),
    }),

    getBOMs: builder.query({
      query: () => '/boms',
    }),

    getBOMById: builder.query({
      query: (id) => `/bom/${id}`,
    }),

    searchInStock: builder.query({
      query: (circuitId) => `/bom/stock/${circuitId}`,
    }),

    updateBOM: builder.mutation({
      query: ({ id, updatedBOM }) => ({
        url: `/bom/${id}`,
        method: 'PUT',
        body: updatedBOM,
      }),
    }),

    deleteBOM: builder.mutation({
      query: (id) => ({
        url: `/bom/${id}`,
        method: 'DELETE',
      }),
    }),

    // Request-related endpoints
    getRequests: builder.query({
      query: () => '/requests',
    }),

    addRequest: builder.mutation({
      query: (request) => ({
        url: '/requests',
        method: 'POST',
        body: request,
      }),
    }),

    updateRequest: builder.mutation({
      query: ({ id, request }) => ({
        url: `/requests/${id}`,
        method: 'PUT',
        body: request,
      }),
    }),

    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `/requests/${id}`,
        method: 'DELETE',
      }),
    }),

    // Additional endpoints can go here as your project evolves
  }),
});

// Export hooks for usage in functional components
export const {
  useSignupMutation,
  useLoginMutation,
  useGetComponentsQuery,
  useAddComponentMutation,
  useUpdateComponentMutation,
  useDeleteComponentMutation,
  useGetLowStockComponentsQuery,
  useGetPurchasesQuery,
  useAddPurchaseMutation,
  useUpdatePurchaseMutation,
  useDeletePurchaseMutation,
  useGetLendingsQuery,
  useAddLendingMutation,
  useUpdateLendingMutation,
  useDeleteLendingMutation,
  useSearchInStockQuery,
  useCreateCircuitMutation,
  useGetBOMsQuery,
  useGetBOMByIdQuery,
  useUpdateBOMMutation,
  useDeleteBOMMutation,
  useGetRequestsQuery,
  useAddRequestMutation,
  useUpdateRequestMutation,
  useDeleteRequestMutation,
} = appApi;

export default appApi;
