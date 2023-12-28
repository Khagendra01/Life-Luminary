import instance from "./instance";

import { RegisterInfo, LoginInfo, LogInResponse, Response } from "../models/authModel";

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

async function login(loginInfo: LoginInfo): Promise<LogInResponse | null> {
  try {
    const response = await instance.post<LogInResponse>("/api/auth/login", loginInfo);
    if (response) {
      return response as unknown as LogInResponse; // assert the response as LogInResponse
    } else {
      console.error("Login failed");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
  


  export {register, login}
