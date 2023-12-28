import instance from "./instance";

import { RegisterInfo, LoginInfo, LogInResponse } from "../models/authModel";

function register(registerInfo : RegisterInfo) {
  return instance
    .post("/api/auth/register", registerInfo)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

function login(loginInfo: LoginInfo) {
  return instance
    .post("/api/auth/login", loginInfo)
    .then((response) => {
      console.log(response)
      return response; // Extract the data from the response
    })
    .catch((error) => {
      throw new Error(error);
    });
}
  


  export {register, login}
