// import { cors } from 'cors';
// import express from 'express';
import express, { Response, Request, NextFunction } from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';

// import { graphqlHTTP } from 'express-graphql';
// import { buildSchema } from 'graphql';
// import axios from 'axios';
// import cors from '../node_modules/cors/lib';
import AppRouter from './routes';
import connectDB from './config/database';

const app = express();
const router = new AppRouter(app);
// Connect to MongoDB
connectDB();

// Express configuration
app.use(cors());
app.set('port', process.env.PORT || 4001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.init();

// TODO: Move that to model GraphQL
// const schema = buildSchema(`
//   type Query {
//     todos: String
//   }
// `);

// TODO: Create graphQL controller
// const rootValue = {
//   todos: async () => {
//     // TODO: Create http service for that
//     const todos = await axios.get('http://localhost:5000/api/todos');
//     return todos.data;
//   }
// };

// TODO: Move that to router init function ONLY AFTER MAIN PART OF APP
// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema,
//     rootValue,
//     graphiql: true
//   })
// );

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, _: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

const port = app.get('port');
// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server;
