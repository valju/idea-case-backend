import express from "express";

import reset_service from './reset_service.js';
import category from './category.js';
import comment from './comment.js';
import idea from './idea.js';
import ideaMember from './ideaMember.js';
import member from './member.js';

const routes = express.Router(); 
routes.use('/category', category);
routes.use('/comment', comment);
routes.use('/idea', idea);
routes.use('/ideaMember', ideaMember);
routes.use('/member', member);
routes.use('/reset_service', reset_service);

export default routes;
