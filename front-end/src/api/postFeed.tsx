import { PostInfo } from "../models/postModel";
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

export { postIt };