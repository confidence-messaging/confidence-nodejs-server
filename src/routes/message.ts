import { Router } from "express";
import { Message } from "../models/Message";
import { sendMessageSchema } from "../schemas/messagesSchema";
import crypto from "crypto";

const messages = Router();

messages.post("/send", async (req, res) => {
  const { t, s, r, c, m } = await sendMessageSchema.validateAsync(req.body);

  const rawMessage = {
    version: 1,
    timestamp: t,
    sender: s,
    recipient: r,
    mimeType: m,
    content: c,
  };

  const hash =
    "0x" +
    crypto
      .createHash("sha256")
      .update(JSON.stringify(rawMessage))
      .digest("hex");

  const message = new Message({
    hash,
    ...rawMessage,
  });

  await message.save();

  res.status(200).send({ hash: message.hash });
});

export { messages as messageRoutes };
