
import instance from "./instance";

async function getMyBio( userId: string | undefined): Promise<string | null> {
    try {
      const response = await instance.get<string>("/api/Activity/profileView", {
        params: {
          userId: userId,
        },
      });
      if (response) {
        return response as unknown as string;
      } else {
        console.error("Error fetching the data");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

export { getMyBio }