import { Response, Request } from 'express';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async add(req: Request, res: Response) {
    const todo = await this.todoService.add(req, res);
    return todo;
  }

  async getAllTodo(_: Request, res: Response) {
    // TODO: Write your implementation here
    const todos = await this.todoService.findAll(_, res);
    console.log('all todos:', res.json(todos));
    return todos;
  }

  async getTodoById(req: Request<{ id: string }>, res: Response) {
    const todo = await this.todoService.getById(req, res);
    return todo;
  }

  async deleteById(req: Request<{ id: string }>, res: Response) {
    const todo = await this.todoService.deleteById(req, res);
    return todo;
  }

  async updateById(req: Request<{ id: string }>, res: Response) {
    const todo = await this.todoService.updateById(req, res);
    return todo;
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
