// import { Document, Model, model, Schema } from 'mongoose';
import { Document, Model } from 'mongoose';
import Joi from 'joi';
import ITodo from '../types/todos.type';

const { model, Schema } = require('mongoose');

interface ITodos extends ITodo, Document {}

const todosSchema: typeof Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    status: {
      type: Boolean,
      default: false
    },
    isPrivate: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false }
);

const addTodo = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(7).max(60),
  status: Joi.boolean().default(false),
  isPrivate: Joi.boolean().default(false)
});

const updStatus = Joi.object({
  status: Joi.boolean().required()
});

const updPrivate = Joi.object({
  isPrivate: Joi.boolean().required()
});

export const todoJoi = {
  addTodo,
  updStatus,
  updPrivate
};

export const Todo: Model<ITodos> = model('Todo', todosSchema);
