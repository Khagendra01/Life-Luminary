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

function login(loginInfo : LoginInfo): Promise<LogInResponse> {
    return instance
      .post("/api/auth/login", loginInfo)
      .then((response) => {

        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  


  export {register, login}
