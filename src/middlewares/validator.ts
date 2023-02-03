import { Response, Request, NextFunction } from 'express';
import Joi from 'joi';
import CreateError from '../helpers/createError';

const newError = new CreateError();

function validation<T extends Joi.ObjectSchema>(schema: T) {
  const func = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw newError.createError(400, error.message);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
  return func;
}

export default validation;
