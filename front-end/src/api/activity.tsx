import instance from "./instance";
import { FeedPosts  } from "../models/postModel";

async function getMyPost( userId: string | undefined): Promise<FeedPosts[] | null> {
    try {
      const response = await instance.get<FeedPosts>("/api/Activity/post", {
        params: {
          userId: userId,
        },
      });
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

export { getMyPost }