export interface PostInfo {
    userId: string | undefined;
    dateTime: string;
    content: string;
    isNameHidden: boolean;
}

export interface UserReactRequest {
    userId: string;
    postId: string;
    isGoodJob: boolean;
    isLove: boolean;   
}
export interface UserReact {
    userId: string;
    postId: string;
    isGoodJob: boolean;
    isLove: boolean;   
}

export interface FeedPosts {
    id: string;
    userId: string;
    content: string;
    dateTime: string;
    isNameHidden: boolean;
    userReactions: UserReact[]
}

export interface ReactResponse {
    goodJob: number;
    love: number;
}