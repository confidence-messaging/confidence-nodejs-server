import { Router } from "express";
import { Message } from "../models/Message";
import { sendMessageSchema } from "../schemas/messagesSchema";
import crypto from "crypto";
import EthCrypto from "eth-crypto";
import { Op } from "sequelize";

const router = Router();

router.post("/send", async (req, res) => {
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

  return res.status(200).send({ hash: message.hash });
});

router.get("/retrieve", async (req, res) => {
  const { t, s, e } = await sendMessageSchema.validateAsync(req.body);

  const timestamp = Math.floor(+new Date() / 1000);

  if (!(t > timestamp && t < timestamp + 5)) throw "invalid signature";

  const messageHash = EthCrypto.hash.keccak256(t);
  const signer = EthCrypto.recover(s, messageHash);

  const query: any = {
    recipient: signer,
  };

  if (e) {
    query.timestamp = {
      [Op.gt]: new Date(e * 1000),
    };
  }

  const messages = await Message.findAll({
    where: query,
  });

  return res.status(200).send(messages);
});

export { router as messagesRoutes };
