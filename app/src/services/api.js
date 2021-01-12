import axios from "axios";
import { getToken } from "../auth";
require("dotenv").config();

const api = axios.create({
   baseURL: `${process.env.REACT_APP_URL_API}`, 
}, {timeout: 5000});

api.interceptors.request.use(async config => {
  
   const token = getToken();
   //const token = setToken();
   config.headers.Authorization = process.env.REACT_APP_AUTH_HASH;
   if (token) {
     config.headers["X-ACCESS-TOKEN"] = token
   }
   return config;
});

api.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default api;
