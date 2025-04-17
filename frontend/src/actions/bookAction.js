import {
  ALL_BOOK_FAIL,
  ALL_BOOK_REQUEST,
  ALL_BOOK_SUCCESS,
  ADMIN_BOOK_REQUEST,
  ADMIN_BOOK_SUCCESS,
  ADMIN_BOOK_FAIL,
  NEW_BOOK_REQUEST,
  NEW_BOOK_SUCCESS,
  NEW_BOOK_FAIL,
  UPDATE_BOOK_REQUEST,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAIL,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAIL,
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_FAIL,
  BOOK_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
} from "../constants/bookConstants";

import api from "../utils/axiosInstance";

// BOOK ACTIONS
export const getBook =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_BOOK_REQUEST });

      let link = `/books?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
        link += `&category=${category}`;
      }

      const { data } = await api.get(link);

      dispatch({ type: ALL_BOOK_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_BOOK_FAIL,
        payload: error.response?.data?.message || "Failed to fetch books",
      });
    }
  };

export const getAdminBook = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_BOOK_REQUEST });
    const { data } = await api.get("/admin/books");
    dispatch({ type: ADMIN_BOOK_SUCCESS, payload: data.books });
  } catch (error) {
    dispatch({
      type: ADMIN_BOOK_FAIL,
      payload: error.response?.data?.message || "Failed to fetch admin books",
    });
  }
};

export const createBook = (bookData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_BOOK_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await api.post("/admin/book/new", bookData, config);
    dispatch({ type: NEW_BOOK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEW_BOOK_FAIL,
      payload: error.response?.data?.message || "Book creation failed",
    });
  }
};

export const updateBook = (id, bookData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BOOK_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await api.put(`/admin/book/${id}`, bookData, config);
    dispatch({ type: UPDATE_BOOK_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_BOOK_FAIL,
      payload: error.response?.data?.message || "Update failed",
    });
  }
};

export const deleteBook = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BOOK_REQUEST });
    const { data } = await api.delete(`/admin/book/${id}`);
    dispatch({ type: DELETE_BOOK_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_BOOK_FAIL,
      payload: error.response?.data?.message || "Delete failed",
    });
  }
};

export const getBookDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_DETAILS_REQUEST });
    const { data } = await api.get(`/book/${id}`);
    dispatch({ type: BOOK_DETAILS_SUCCESS, payload: data.book });
  } catch (error) {
    dispatch({
      type: BOOK_DETAILS_FAIL,
      payload: error.response?.data?.message || "Failed to fetch book details",
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await api.put(`/review`, reviewData, config);
    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response?.data?.message || "Review submission failed",
    });
  }
};

export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });
    const { data } = await api.get(`/reviews?id=${id}`);
    dispatch({ type: ALL_REVIEW_SUCCESS, payload: data.reviews });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response?.data?.message || "Failed to fetch reviews",
    });
  }
};

export const deleteReviews = (reviewId, bookId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });
    const { data } = await api.delete(
      `/reviews?id=${reviewId}&bookId=${bookId}`
    );
    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response?.data?.message || "Failed to delete review",
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: clearErrors });
};
