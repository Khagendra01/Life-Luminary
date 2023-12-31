import { EachReact, FeedPosts, PostInfo, ReactResponse } from "../models/postModel";
import instance from "./instance";

function postIt(postInfo : PostInfo) {
    return instance
      .post("/api/Post/post", postInfo)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

async function getPost(): Promise<FeedPosts[] | null> {
  try {
    const response = await instance.get<FeedPosts>("/api/Post/post");
    if (response) {
      return response as unknown as FeedPosts[];
    } else {
      console.error("Error fetching the data");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getReact( postId: string): Promise<ReactResponse | null> {
  try {
    const response = await instance.get<ReactResponse>('/api/Post/getReact', {
      params: {
        postId: postId,
      },
    });
    
    if (response) {
      return response as unknown as ReactResponse;
    } else {
      console.error("Error fetching the data");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getEachReact( reactRequest: EachReact): Promise<ReactResponse | null> {
  try {
    const response = await instance.get<ReactResponse>('/api/Post/getEachReact', {
      params: {
        userId: reactRequest.userId,
        postId: reactRequest.postId
      },
    });
    
    if (response) {
      return response as unknown as ReactResponse;
    } else {
      console.error("Error fetching the data");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}


export { postIt, getPost, getReact, getEachReact };