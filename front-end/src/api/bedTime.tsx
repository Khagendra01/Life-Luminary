import { StoryRes } from "../models/postModel";
import instance from "./instance";

async function getMyStory( userId: string | undefined, dateTime: string ): Promise<StoryRes | null> {
    try {
      const response = await instance.get<StoryRes>("/api/BedTime/story", {
        params: {
          userId: userId,
          dateTime: dateTime
        },
      });
      if (response) {
        return response as unknown as StoryRes;
      } else {
        console.error("Error fetching the data");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

export { getMyStory }