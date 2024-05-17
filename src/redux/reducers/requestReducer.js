import {
    GET_FRIEND_REQUESTS_SUCCESS,
    GET_FRIEND_REQUESTS_REQUEST,
    GET_FRIEND_REQUESTS_FAIL,
    GET_SENT_FRIEND_REQUESTS_SUCCESS,
    GET_SENT_FRIEND_REQUESTS_FAIL,
    GET_SENT_FRIEND_REQUESTS_REQUEST,
    ACCEPT_FRIEND_REQUEST,
    SEND_FRIEND_REQUEST,
    UNSEND_FRIEND_REQUEST,
    CLEAR_ERRORS,
} from "../constants/requestConstants"


export const requestReducer = (state = { friendRequests: [], sentFriendRequests: [] }, action) => {
    switch (action.type) {
        case GET_FRIEND_REQUESTS_REQUEST:
        case GET_SENT_FRIEND_REQUESTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_FRIEND_REQUESTS_SUCCESS:
            return {
                ...state,
                loading: false,
                friendRequests: action.payload
            }
        case GET_FRIEND_REQUESTS_FAIL:
            return {
                ...state,
                error: action.payload,
            }
        case ACCEPT_FRIEND_REQUEST:
            return {
                ...state,
                friendRequests: state.friendRequests.filter(r => r.id !== action.payload)
            }
        case SEND_FRIEND_REQUEST:
            return {
                ...state,
                sentFriendRequests: [action.payload, ...state.sentFriendRequests]
            }
        case GET_SENT_FRIEND_REQUESTS_SUCCESS:
            return {
                ...state,
                loading: false,
                sentFriendRequests: action.payload,
            }
        case GET_SENT_FRIEND_REQUESTS_FAIL:
            return {
                ...state,
                error: action.payload,
            }
        case UNSEND_FRIEND_REQUEST:
            return {
                ...state,
                sentFriendRequests: state.sentFriendRequests.filter(s => s.id !== action.payload)
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