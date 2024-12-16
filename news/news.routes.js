import {Router} from 'express';
import { handleGetNews } from './news.controllers.js';


export const newsRouter = Router();

newsRouter.get('/', handleGetNews);

