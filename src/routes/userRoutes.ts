import { Router } from 'express';
import { Auth } from '../middlewares/auth';

import * as UserController from '../controllers/userController';

const router = Router();

router.get('/user/list', Auth.private,  UserController.listUser);
router.get('/logout', UserController.logout);

router.post('/postuser', UserController.postUser);
router.post('/loginuser', UserController.login);

router.put('/user/:id', Auth.private, UserController.updateUser)

router.delete('/user/:id', Auth.private, UserController.deleteUser)

export default router;