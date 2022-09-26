import express from "express";

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

export default routes;
