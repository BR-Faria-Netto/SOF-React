import jwt_decode from "jwt-decode";
import * as jwt  from 'jsonwebtoken'; 

export const isAuthenticated = () => getToken();
export const getUser = () => JSON.parse(localStorage.getItem("user"))
export const setUser = (data) => localStorage.setItem("user", JSON.stringify(data.user));
export const getToken = () => localStorage.getItem("loginToken");
export const login = data => { localStorage.setItem("loginToken", data.token); setUser(data) }
export const logout = () => { localStorage.clear() }
export const generatePassword = () => {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
export const setToken = () => {
     const loggedUser = getUser();
     if (loggedUser) {
         const token = jwt.sign({ email: loggedUser.email,  loggedUser: loggedUser._id }, process.env.REACT_APP_AUTH_HASH, {
           expiresIn: '3h'
         });
         localStorage.setItem("loginToken", token)
         return token;
     }
}
export const isTokenExpired = () => {
   try {
     const decoded = jwt_decode(getToken());
     if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
   } catch (err) {
      return false;
   }
}
