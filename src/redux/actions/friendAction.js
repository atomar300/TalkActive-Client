import { Api } from "../../Api";
import {
    SELECTED_FRIEND_DETAILS_FAIL,
    SELECTED_FRIEND_DETAILS_REQUEST,
    SELECTED_FRIEND_DETAILS_SUCCESS,
    CLEAR_ERRORS,
    GET_ALL_FRIENDS_DETAILS_REQUEST,
    GET_ALL_FRIENDS_DETAILS_SUCCESS,
    GET_ALL_FRIENDS_DETAILS_FAIL,
    NEW_INCOMING_MESSAGE_TRUE,
    NEW_INCOMING_MESSAGE_FALSE,
} from "../constants/friendConstants";

// fetch a friend details
export const getFriendDetails = (selectedId) => async (dispatch) => {
    try {
        dispatch({ type: SELECTED_FRIEND_DETAILS_REQUEST });

        const token = localStorage.getItem("talkactiveToken");
        const config = { headers: { "Authorization": `Bearer ${token}` } }

        const { data } = await Api.get(`/api/friend/${selectedId}`, config);

        dispatch({ type: SELECTED_FRIEND_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SELECTED_FRIEND_DETAILS_FAIL, payload: error.response.data.message });
    }
}


export const getAllFriends = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_FRIENDS_DETAILS_REQUEST });

        const token = localStorage.getItem("talkactiveToken");
        const config = { headers: { "Authorization": `Bearer ${token}` } }

        const { data } = await Api.get(`/api/friends`, config);

        dispatch({ type: GET_ALL_FRIENDS_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_FRIENDS_DETAILS_FAIL, payload: error.response.data.message });
    }
}


// to update the allFriends when a new message is received
export const newMessageTrueValue = (id) => async (dispatch) => {
    dispatch({ type: NEW_INCOMING_MESSAGE_TRUE, payload: id });
}

// to set the new message equal to false when clicked on the user who sent the message
export const newMessageFalseValue = (id) => async (dispatch) => {
    dispatch({ type: NEW_INCOMING_MESSAGE_FALSE, payload: id });
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}