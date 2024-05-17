import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
} from "../constants/userConstants";
import { Api } from "../../Api";


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await Api.post(`/api/login`, { email, password }, config);

        dispatch({ type: LOGIN_SUCCESS, payload: data });

        localStorage.setItem("talkactiveToken", data.token);

    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
}



export const register = (name, email, password, profileImage) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await Api.post(`/api/register`, { name, email, password, profileImage }, config);

        localStorage.setItem("talkactiveToken", data.token);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
}



export const loadAccount = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const token = localStorage.getItem("talkactiveToken");
        const config = { headers: { "Authorization": `Bearer ${token}` } }

        const { data } = await Api.get(`/api/me`, config);

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
}


export const logout = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("talkactiveToken");
        const config = { headers: { "Authorization": `Bearer ${token}` } }

        await Api.get(`/api/logout`, config);

        localStorage.setItem("talkactiveToken", null);

        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}