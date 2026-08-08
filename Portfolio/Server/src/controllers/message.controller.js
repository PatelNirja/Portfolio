const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const messageService = require("../services/message.service");

const listMessages = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const result = await messageService.getMessages({ page, limit });
  res.status(200).json(
    new ApiResponse(
      200,
      { messages: result.messages, unreadCount: result.unreadCount },
      "Messages retrieved successfully",
      result.pagination
    )
  );
});

const submitMessage = asyncHandler(async (req, res) => {
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const message = await messageService.createMessage(req.body, ipAddress);
  res.status(201).json(new ApiResponse(201, { message }, "Thank you! Your message has been sent successfully."));
});

const markRead = asyncHandler(async (req, res) => {
  const message = await messageService.markAsRead(req.params.id);
  res.status(200).json(new ApiResponse(200, { message }, "Message marked as read"));
});

const removeMessage = asyncHandler(async (req, res) => {
  await messageService.deleteMessage(req.params.id);
  res.status(200).json(new ApiResponse(200, null, "Message deleted successfully"));
});

module.exports = { listMessages, submitMessage, markRead, removeMessage };
