import { Response, Request, NextFunction } from 'express';

function ctrlWrapper<T extends Function>(ctrl: T) {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await ctrl(req, res, next);
      res.send(todo);
    } catch (error) {
      next(error);
    }
  };
  return func;
}

export default ctrlWrapper;
