import { Router } from "express";
import EthCrypto from "eth-crypto";

const router = Router();

router.get("/create-identity", async (req, res) => {
  return res.status(200).send(EthCrypto.createIdentity());
});

export { router as utilsRoutes };
