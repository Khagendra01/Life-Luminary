import { ContactInfo } from "../models/contactModel";
import instance from "./instance";

function contactUs(contactInfo : ContactInfo) {
    return instance
      .post("/api/ContactUs/post", contactInfo)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

export { contactUs }