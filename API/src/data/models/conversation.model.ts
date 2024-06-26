import { Schema, model } from "mongoose";
import IConversationModel from "../interfaces/conversation.interface";

const DOCUMENT_NAME = "Conversation";
const COLLECTION_NAME = "conversations";

const conversationSchema: Schema<IConversationModel> =
  new Schema<IConversationModel>(
    {
      name: String,
      participants: {
        type: [
          {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
        ],
        default: [],
      },
    },
    { timestamps: true, collection: COLLECTION_NAME }
  );

const Conversation = model<IConversationModel>(
  DOCUMENT_NAME,
  conversationSchema
);

export default Conversation;
