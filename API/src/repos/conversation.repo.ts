import { Types } from "mongoose";
import Conversation from "../data/models/conversation.model";

class ConversationRepo {
  constructor() {}

  async findByIdAndUser(id: Types.ObjectId, userId: Types.ObjectId) {
    return await Conversation.findOne({
      _id: id,
      participants: { $in: [userId] },
    });
  }

  async createConversation(participantIds: Array<Types.ObjectId>) {
    return await Conversation.create({
      participants: participantIds,
    });
  }

  async addMessageToConversation(
    conversationId: Types.ObjectId,
    messageId: Types.ObjectId
  ) {
    return await Conversation.findByIdAndUpdate(
      conversationId,
      {
        $addToSet: {
          messages: messageId,
        },
      },
      { new: true, upsert: true }
    );
  }

  async getConversation(conversationId: Types.ObjectId) {
    return await Conversation.findById(conversationId)
      .populate({
        path: "messages",
      })
      .populate({
        path: "participants",
        select: { _id: 1, name: 1, username: 1, avatar: 1 },
      });
  }
}

export default new ConversationRepo();