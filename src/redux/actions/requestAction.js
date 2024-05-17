import {
    GET_FRIEND_REQUESTS_FAIL,
    GET_FRIEND_REQUESTS_SUCCESS,
    GET_FRIEND_REQUESTS_REQUEST,
    GET_SENT_FRIEND_REQUESTS_SUCCESS,
    GET_SENT_FRIEND_REQUESTS_FAIL,
    GET_SENT_FRIEND_REQUESTS_REQUEST,
    ACCEPT_FRIEND_REQUEST,
    SEND_FRIEND_REQUEST,
    UNSEND_FRIEND_REQUEST,
    CLEAR_ERRORS,
} from "../constants/requestConstants";
import { Api } from "../../Api";


export const getAllFriendRequests = () => async (dispatch) => {
    try {
        dispatch({ type: GET_FRIEND_REQUESTS_REQUEST });

        const token = localStorage.getItem("talkactiveToken");
        const config = { headers: { "Authorization": `Bearer ${token}` } }

        const { data } = await Api.get(`/api/friend-requests`, config);

        dispatch({ type: GET_FRIEND_REQUESTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_FRIEND_REQUESTS_FAIL, payload: error.response.data.message });
    }
}


export const getAllSentFriendRequests = () => async (dispatch) => {
    try {
        dispatch({ type: GET_SENT_FRIEND_REQUESTS_REQUEST });

        const token = localStorage.getItem("talkactiveToken");
        const config = { headers: { "Authorization": `Bearer ${token}` } }

        const { data } = await Api.get(`/api/friend-requests/sent`, config);

        dispatch({ type: GET_SENT_FRIEND_REQUESTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_SENT_FRIEND_REQUESTS_FAIL, payload: error.response.data.message });
    }
}

export const acceptRequest = (id) => async (dispatch) => {
    const token = localStorage.getItem("talkactiveToken");
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    await Api.post(`/api/friend-request/accept`, { "senderUserId": id }, config);
    dispatch({ type: ACCEPT_FRIEND_REQUEST, payload: id });
}

export const unsendFriendRequest = (id) => async (dispatch) => {
    const token = localStorage.getItem("talkactiveToken");
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    await Api.post(`/api/friend-request/send`, { "selectedUserId": id }, config);
    dispatch({ type: UNSEND_FRIEND_REQUEST, payload: id });
}


export const sendFriendRequest = (user) => async (dispatch) => {
    const token = localStorage.getItem("talkactiveToken");
    const config = { headers: { "Authorization": `Bearer ${token}` } }
    await Api.post(`/api/friend-request/send`, { "selectedUserId": user.id }, config);
    dispatch({ type: SEND_FRIEND_REQUEST, payload: user });
}


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}