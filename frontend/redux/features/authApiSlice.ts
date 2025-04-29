// Extends base apiSlice

import { apiSlice } from "../services/apiSlice";
import { Songs } from "@/schemas/songs";
import { User } from "@/schemas/auth";

const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true, // <-- add this line

  endpoints: (builder) => ({
    // useRetrieveUserQuery
    retrieveUser: builder.query<User, void>({
      query: () => "/users/me/",
    }),

    // useSongsQuery
    songs: builder.query<Songs[], void>({
      query: () => "/saved-songs/",
    }),

    // socialAuthenticate: builder.mutation<CreateUserResponse, SocialAuthArgs>({
    //   query: ({ provider, state, code }) => ({
    //     url: `o/${provider}/?state=${encodeURIComponent(
    //       state
    //     )}&code=${encodeURIComponent(code)}`,
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   }),
    // }),

    // useLoginMutation
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "jwt/create/", // login endpoint. put access and refresh token in cookies
        method: "POST",
        body: { email, password },
      }),
    }),

    // useRegisterMutation
    register: builder.mutation({
      query: ({ first_name, last_name, email, password, re_password }) => ({
        url: "/users/", // register endpoint
        method: "POST",
        body: { first_name, last_name, email, password, re_password },
      }),
    }),

    // useVerifyMutation
    verify: builder.mutation({
      query: () => ({
        url: "/jwt/verify/", // verify endpoint
        method: "POST",
      }),
    }),

    // useLogoutMutation
    logout: builder.mutation({
      query: () => ({
        url: "/logout/", // verify endpoint
        method: "POST",
      }),
    }),

    // useActivationMutation
    activation: builder.mutation({
      query: ({ uid, token }) => ({
        url: "/users/activation/", // verify endpoint
        method: "POST",
        body: { uid, token },
      }),
    }),

    // useResetPasswordMutation
    resetPassword: builder.mutation({
      query: (email) => ({
        url: "/users/reset_password/", // verify endpoint
        method: "POST",
        body: { email },
      }),
    }),

    // useResetPasswordConfirmMutation
    resetPasswordConfirm: builder.mutation({
      query: ({ uid, token, new_password, re_new_password }) => ({
        url: "/users/reset_password_confirm/", // verify endpoint
        method: "POST",
        body: { uid, token, new_password, re_new_password },
      }),
    }),

    // useSaveSongsMutation
    saveSongs: builder.mutation({
      query: ({
        track_name,
        track_artist,
        track_genre,
        track_link,
        track_rating,
      }) => ({
        url: "saved-songs/",
        method: "POST",
        body: {
          track_name,
          track_artist,
          track_genre,
          track_link,
          track_rating,
        },
      }),
    }),

    // useSaveTrackRatingMutation
    saveTrackRating: builder.mutation({
      query: ({ song_id, track_rating }) => ({
        url: `saved-songs/${song_id}/`,
        method: "PATCH",
        body: { track_rating },
      }),
    }),

    // useDeleteSavedSongMutation
    deleteSavedSong: builder.mutation({
      query: (song_id) => ({
        url: `saved-songs/${song_id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// name follows convention of {name}{type}Query
export const {
  useRetrieveUserQuery,
  useSongsQuery,
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
  useActivationMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useSaveSongsMutation,
  useSaveTrackRatingMutation,
  useDeleteSavedSongMutation,
} = authApiSlice;
