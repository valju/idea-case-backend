import express from "express";

import reset_service from './reset_service';
import category from './category';
import comment from './comment';
import idea from './idea';
import ideaMember from './ideaMember';
import member from './member';

const routes = express.Router(); 
routes.use('/reset_service', reset_service);
routes.use('/category', category);
routes.use('/comment', comment);
routes.use('/idea', idea);
routes.use('/ideaMember', ideaMember);
routes.use('/member', member);

export default routes;
