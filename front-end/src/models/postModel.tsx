export interface PostInfo {
    userId: string;
    content: string;
}

export interface UserReact {
    userId: string;
    postId: string;
    react: boolean;   
}