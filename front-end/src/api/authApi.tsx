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
    const response = await instance.post<Response<LogInResponse>>("/api/auth/login", loginInfo);
    if (response.data.IsSuccess) {
      return response.data.Result;
    } else {
      console.error(response.data.Message);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
  


  export {register, login}
