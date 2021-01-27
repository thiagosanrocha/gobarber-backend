import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import './database';

import routes from './routes';
import AppError from './errors/AppError';

import avatarUploadConfigs from './configs/avatarUpload';

const server = express();

server.use(express.json());

server.use('/files', express.static(avatarUploadConfigs.directory));

server.use(routes);

server.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

server.listen(3333, () => console.log('Server started on port 3333!'));
