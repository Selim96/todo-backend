import { Response, Request } from 'express';
import { Todo } from '../models/Todos';
import CreateError from '../helpers/createError';

const errors = new CreateError();

export default class TodoService {
  async findAll(req: Request, res: Response) {
    const result = await Todo.find();
    res.json(result);
  }

  async add(req: Request, res: Response) {
    const result = await Todo.create(req.body);
    res.status(201).json(result);
  }

  async deleteById(req: Request, res: Response) {
    const { id } = req.params;
    // const trimedId = todoId.trim();
    const result = await Todo.findByIdAndRemove(id);
    if (!result) {
      throw errors.createError(404);
    }
    res.json(result);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await Todo.findById(id);
    res.json(result);
  }

  async updateById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await Todo.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      throw errors.createError(404);
    }
    res.json(result);
  }
}
