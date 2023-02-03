import { Response, Request, NextFunction } from 'express';
import { Model } from 'mongoose';
import CreateError from '../helpers/createError';

const error = new CreateError();

const isValidId =
  <T>(model: Model<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const item = await model.findById(id);
      if (!item) {
        next(error.createError(400, 'Not Id'));
      }
      next();
    } catch (err) {
      next(err);
    }
  };

export default isValidId;
