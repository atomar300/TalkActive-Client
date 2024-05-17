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
} from "../constants/friendConstants"


export const friendReducer = (state = { selectedFriend: {}, allFriends: [] }, action) => {
    switch (action.type) {
        case GET_ALL_FRIENDS_DETAILS_REQUEST:
            return {
                ...state,
            }
        case GET_ALL_FRIENDS_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                allFriends: action.payload
            }
        case GET_ALL_FRIENDS_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case SELECTED_FRIEND_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SELECTED_FRIEND_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedFriend: action.payload,
            }
        case SELECTED_FRIEND_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case NEW_INCOMING_MESSAGE_TRUE:
            return {
                ...state,
                allFriends: state.allFriends.map(f => {
                    if (f.id === action.payload) {
                        return { ...f, newMessage: true }
                    }
                    return f;
                })
            }
        case NEW_INCOMING_MESSAGE_FALSE: 
            return {
                ...state,
                allFriends: state.allFriends.map(f => {
                    if (f.id === action.payload) {
                        return { ...f, newMessage: false }
                    }
                    return f;
                })
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