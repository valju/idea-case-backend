import express from 'express';

import reset_service from './reset_service';
import category from './category';

const routes = express.Router(); 
routes.use('/reset_service', reset_service);
routes.use('/category', category);

export default routes;
