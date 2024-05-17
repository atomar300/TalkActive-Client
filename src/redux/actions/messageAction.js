import {
    CLEAR_ERRORS,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAIL,
    GET_MESSAGES_REQUEST,
    ADD_TO_CURRENT_CHAT_MESSAGES,
} from "../constants/messageConstants";
import { Api } from "../../Api";


export const getMessages = (userIds) => async (dispatch) => {
    try {
        dispatch({ type: GET_MESSAGES_REQUEST });

        const token = localStorage.getItem("talkactiveToken");
        const config = { headers: { "Authorization": `Bearer ${token}` } }

        const { data } = await Api.post("/api/fetch-chat", userIds, config);

        dispatch({ type: GET_MESSAGES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_MESSAGES_FAIL, payload: error.response.data.message });
    }
}

// to add the message to the currentChatMessages
export const addToCurrentChatMessages = (newMessage) => async (dispatch) => {
    dispatch({ type: ADD_TO_CURRENT_CHAT_MESSAGES, payload: newMessage });
}


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}