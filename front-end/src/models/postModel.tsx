export interface PostInfo {
    userId: string | undefined;
    dateTime: string;
    content: string;
    isNameHidden: boolean;
}

export interface UserReact {
    userId: string;
    postId: string;
    react: boolean;   
}