import axios from "axios"

export const Api = axios.create(
    {
        baseURL : "http://localhost:8080"
        // baseURL : "http://192.168.2.242:8080"
        // baseURL : "http://192.168.2.23:8080"
    })