export const ApiConstants = {
  REVIEW: {
    ADD_REVIEW: (userId: number) => {
      return "/review/" + userId;
    },

    GET_ALL_REVIEWS: "/review/",

    MY_REVIEWS: (userId: number) => {
      return "/review/myReviews/" + userId;
    },
    MY_FAVORITE_REVIEWS: () => {
      return "/review/myFavoriteReviews/";
    },

    GET_SINGLE_REVIEW: (reviewId: number) => {
      return "/review/" + reviewId;
    },

    MARK_FAVORITE: (reviewId: number) => {
      return "/review/markFavorite/" + reviewId;
    },

    REMOVE_FAVORITE: (reviewId: number) => {
      return "/review/removeFavorite/" + reviewId;
    },

    DELETE: (reviewId: number) => {
      return "/review/" + reviewId;
    },

    UPDATE_REVIEW: (reviewId: number) => {
      return "/review/" + reviewId;
    },
    UPLOAD_IMAGE: (reviewId: number) => {
      return "/review/image/upload/" + reviewId;
    },
    GET_IMAGE: (reviewId: number) => {
      return "/review/image/" + reviewId;
    },
  },
  USER: {
    SIGN_UP: "/user/signUp",
    FIND_ALL: "/user",
    DELETE: (userId: number) => {
      return "/user/" + userId;
    },
  },
  LOGIN: "/auth/login",
};
