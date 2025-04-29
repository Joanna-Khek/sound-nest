import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// createApi: Server state / data fetching (API calls)
export const fastApiSlice = createApi({
  // A unique key under which the slice reducer will be mounted in the Redux store
  reducerPath: "fastapi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_FASTAPI_HOST}/api/${process.env.NEXT_PUBLIC_FASTAPI_VERSION}/model`
  }),
  endpoints: (builder) => ({}), // endpoints defined in features/modelApiSlice.ts
});
