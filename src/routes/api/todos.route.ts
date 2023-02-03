import { Router } from 'express';
import todoController from '../../controllers/todo.controller';
import ctrlWrapper from '../../helpers/ctrlWrapper';
import validation from '../../middlewares/validator';
import isValidId from '../../middlewares/isValidId';
import { todoJoi, Todo } from '../../models/Todos';

const todosRouter: Router = Router();

todosRouter.post(
  '/',
  validation(todoJoi.addTodo),
  ctrlWrapper(todoController.add.bind(todoController))
);

todosRouter.get('/', ctrlWrapper(todoController.getAllTodo.bind(todoController)));

todosRouter.get(
  '/:id',
  isValidId(Todo),
  ctrlWrapper(todoController.getTodoById.bind(todoController))
);

todosRouter.delete(
  '/:id',
  isValidId(Todo),
  ctrlWrapper(todoController.deleteById.bind(todoController))
);

todosRouter.patch(
  '/:id/completed',
  isValidId(Todo),
  validation(todoJoi.updStatus),
  ctrlWrapper(todoController.updateById.bind(todoController))
);

todosRouter.patch(
  '/:id/private',
  isValidId(Todo),
  validation(todoJoi.updPrivate),
  ctrlWrapper(todoController.updateById.bind(todoController))
);

export default todosRouter;
