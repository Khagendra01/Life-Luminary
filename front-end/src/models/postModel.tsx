export interface PostInfo {
    userId: string | undefined;
    dateTime: string;
    content: string;
    isNameHidden: boolean;
}

export interface UserReact {
    userId: string | undefined;
    postId: string;
    isGoodJob: number | boolean | undefined;
    isLove: number | boolean | undefined;   
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
    goodJob: number | boolean | undefined ;
    love: number | boolean | undefined;
}

export interface ReactionModel {
    [key: string]: number | boolean | undefined;
}

export interface EachReact {
    userId: string | undefined;
    postId: string;
}