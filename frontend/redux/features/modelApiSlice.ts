import { fastApiSlice } from "../services/fastApiSlice";

const modelApiSlice = fastApiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // usePredictAttributesMutation
    predictAttributes: builder.mutation({
      query: ({ prompt }) => ({
        url: "/predict-attributes/",
        method: "POST",
        body: { prompt },
      }),
    }),

    // useSongRecommenderMutation
    songRecommender: builder.mutation({
        query: ({ session_id, updated_attributes }) => ({
            url: "/song-recommender/",
            method: "POST",
            body: { session_id, updated_attributes },
        })
    }),
  }),
});

export const { 
    usePredictAttributesMutation,
    useSongRecommenderMutation,
    } = modelApiSlice;
