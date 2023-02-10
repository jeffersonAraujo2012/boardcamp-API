import Joi from 'joi';

const gameSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  stockTotal: Joi.number().min(0).required(),
  pricePerDay: Joi.number().min(0).required(),
});

export default gameSchema;
