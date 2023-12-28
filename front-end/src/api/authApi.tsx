import instance from "./instance";

import { RegisterInfo, LoginInfo, Response } from "../models/authModel";

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
    .post<Response>("/api/auth/login", loginInfo)
    .then((response) => {
      const data: Response = response.data;
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
  


  export {register, login}
