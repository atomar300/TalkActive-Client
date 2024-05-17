import {
    ADD_TO_CURRENT_CHAT_MESSAGES,
    CLEAR_ERRORS,
    GET_MESSAGES_FAIL,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    IS_SUBSCRIBED,
} from "../constants/messageConstants"


export const messageReducer = (state = { currentChatMessages: [], chatId: {} }, action) => {
    switch (action.type) {
        case IS_SUBSCRIBED:
            return {
                ...state,
                isSubscribed: true,
            }
        case ADD_TO_CURRENT_CHAT_MESSAGES:
            return {
                ...state,
                currentChatMessages: [...state.currentChatMessages, action.payload],
            }
        case GET_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                currentChatMessages: action.payload.messages,
                chatId: action.payload.id,
            }
        case GET_MESSAGES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}