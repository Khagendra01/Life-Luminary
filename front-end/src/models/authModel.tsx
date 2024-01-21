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

export interface AuthContextType {
    user: LogInResponse | null;
    setUser: React.Dispatch<React.SetStateAction<LogInResponse | null>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserProfileView {
    firstName: string;
    lastName: string;
}

export interface GoogleUserInfo {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
}
