import axios from "../configs/axios.config";

export const createMessage = async (body: {
  conversation: string;
  message?: string;
  file?: File;
  replyMessage?: string;
  react?: string;
}) => {
  try {
    const formData = new FormData();
    formData.append("conversation", body.conversation);
    if (body.message) formData.append("message", body.message);
    if (body.file) formData.append("file", body.file);
    if (body.replyMessage) formData.append("replyMessage", body.replyMessage);
    if (body.react) formData.append("react", body.react);
    const res = await axios.post(
      "http://localhost:8000/api/v1/message",
      formData
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};
