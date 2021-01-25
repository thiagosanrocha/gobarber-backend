import express from 'express';
import 'reflect-metadata';
import './database';

import routes from './routes';

import avatarUploadConfigs from './configs/avatarUpload';

const server = express();

server.use(express.json());

server.use('/files', express.static(avatarUploadConfigs.directory));

server.use(routes);

server.listen(3333, () => console.log('Server started on port 3333!'));
