import Joi from 'joi';

const customerSchema = Joi.object({
  name: Joi.string().required(),
  cpf: Joi.string().regex(/^\d{11}$/).required(),
  phone: Joi.string().regex(/^\d{10,11}$/).required(),
  birthday: Joi.date().required(),
});

export default customerSchema;
