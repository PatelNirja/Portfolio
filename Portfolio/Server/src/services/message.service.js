const Message = require("../models/Message.model");
const ApiError = require("../utils/ApiError");

const getMessages = async ({ page = 1, limit = 20 }) => {
  const skip = (page - 1) * limit;
  const total = await Message.countDocuments();
  const unreadCount = await Message.countDocuments({ isRead: false });

  const messages = await Message.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  return {
    messages,
    unreadCount,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const createMessage = async (data, ipAddress) => {
  return await Message.create({ ...data, ipAddress });
};

const markAsRead = async (id) => {
  const message = await Message.findByIdAndUpdate(id, { isRead: true }, { new: true });
  if (!message) throw new ApiError(404, "Message not found.");
  return message;
};

const deleteMessage = async (id) => {
  const message = await Message.findByIdAndDelete(id);
  if (!message) throw new ApiError(404, "Message not found.");
  return message;
};

module.exports = { getMessages, createMessage, markAsRead, deleteMessage };
