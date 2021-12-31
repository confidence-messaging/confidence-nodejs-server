import Joi from "joi";

export const sendMessageSchema = Joi.object({
  t: Joi.number().required(),
  s: Joi.string().required(),
  r: Joi.string().required(),
  c: Joi.string().required(),
  m: Joi.string().required(),
});
