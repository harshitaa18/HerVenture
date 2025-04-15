// const express = require("express");
// const router = express.Router();
// const Message = require("../models/message");

// // Save a new message
// router.post("/", async (req, res) => {
//   try {
//     const { senderId, receiverId, message } = req.body;
//     const newMsg = new Message({ senderId, receiverId, message });
//     await newMsg.save();
//     res.status(201).json(newMsg);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to send message" });
//   }
// });

// // Get chat between two users
// router.get("/:senderId/:receiverId", async (req, res) => {
//   const { senderId, receiverId } = req.params;
//   try {
//     const messages = await Message.find({
//       $or: [
//         { senderId, receiverId },
//         { senderId: receiverId, receiverId: senderId }
//       ]
//     }).sort({ createdAt: 1 });

//     res.json(messages);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch messages" });
//   }
// });

// module.exports = router;
