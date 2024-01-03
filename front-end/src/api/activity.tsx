import instance from "./instance";
import { FeedPosts  } from "../models/postModel";
import { UserProfileView } from "../models/authModel";

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

  async function getDailyPost( userId: string | undefined, dateTime: string): Promise<FeedPosts | null> {
    try {
      const response = await instance.get<FeedPosts>("/api/Activity/eachPost", {
        params: {
          userId: userId,
          dateTime: dateTime
        },
      });
      if (response) {
        return response as unknown as FeedPosts;
      } else {
        console.error("Error fetching the data");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  
  async function getAllUser( userId: string | undefined): Promise<UserProfileView | null> {
    try {
      const response = await instance.get<UserProfileView>("/api/Activity/profileView", {
        params: {
          userId: userId,
        },
      });
      if (response) {
        return response as unknown as UserProfileView;
      } else {
        console.error("Error fetching the data");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

export { getMyPost, getDailyPost, getAllUser }