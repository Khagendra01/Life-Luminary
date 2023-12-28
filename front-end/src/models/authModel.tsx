export interface RegisterInfo {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginInfo {
    userName: string;
    password: string;
}

export interface LogInResponse {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    accessToken: string
}

export interface Response<T> {
    Message: string;
    Result: T | null;
    IsSuccess: boolean;
  }