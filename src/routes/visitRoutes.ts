import { Router } from 'express';
import { Auth } from '../middlewares/auth';
import * as VisitController from '../controllers/visitController';

const router = Router();

router.get('/', VisitController.index);
router.get('/visit/new', VisitController.newVisit);
router.get('/visit/list', VisitController.listVisit);
router.get('/visit/update/:id', VisitController.visit);
router.get('/visit/finish/:id', VisitController.finish);
router.get('/visit/closed', VisitController.closedVisit);

router.post('/postvisit', VisitController.postVisit);
router.post('/updatevisit', VisitController.updateVisit);
router.post('/finishvisit', VisitController.finishVisit);



export default router;