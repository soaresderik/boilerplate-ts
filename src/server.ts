/* eslint-disable no-console */
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';
import HttpException from '@shared/errors/HttpException';
import routes from './routes';

(async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(routes);

  app.use(
    (err: Error, request: Request, response: Response, _: NextFunction) => {
      if (err instanceof HttpException) {
        return response.status(err.statusCode).json({
          status: err.statusCode || 500,
          message: err.message,
        });
      }

      return response.status(500).json({
        status: 500,
        message: 'Internal server error',
      });
    },
  );

  app.listen(3002, () => {
    console.log('Server started on port 3002!');
  });
})();
