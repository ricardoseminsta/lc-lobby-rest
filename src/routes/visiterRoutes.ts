import { Router } from 'express';
import { Auth } from '../middlewares/auth';
import * as VisiterController from '../controllers/visiterController';

const router = Router();

router.get('/', VisiterController.index);
router.get('/visiter/new', VisiterController.newVisiter);
router.get('/visiter/list', VisiterController.listVisiter);
router.get('/visiter/update/:id', VisiterController.visiter);

router.post('/postvisiter', VisiterController.postVisiter);
router.post('/updatevisiter', VisiterController.updateVisiter);

router.get('/visiter/delete/:id', VisiterController.deleteVisiter);

export default router;