import instance from "./instance";

import { RegisterInfo, LoginInfo, LogInResponse, GoogleUserInfo } from "../models/authModel";

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

async function googleRegister(googleRes: GoogleUserInfo): Promise<LogInResponse | null> {
 
      try {
        const response = await instance.post<LogInResponse>("/api/google/register",  googleRes);
        if (response) {
          return response as unknown as LogInResponse; // assert the response as LogInResponse
        } else {
          console.error("Registration failed");
          return null;
        }
      } catch (error) {
        throw new Error(error);
      }
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
    throw new Error(error);
  }
}

async function refreshLogin(): Promise<LogInResponse | null> {
  try {
    const response = await instance.get<LogInResponse>("/api/auth/refresh-login");
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
  


  export {register, googleRegister, login, refreshLogin}
