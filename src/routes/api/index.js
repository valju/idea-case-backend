import express from 'express';
import category from './category';

const routes = express.Router(); 
routes.use('/category', category);

export default routes;
