import { Router } from 'express';
import RequestController from '../controller/controller-request';

const router: Router = Router();

router.get('/lista', RequestController.getAllRequests);
router.post('/create', RequestController.createRequest);
router.get('/cerca', RequestController.searchRequests);
router.put('/update/:id', RequestController.updateRequest);
router.delete('/delete/:id', RequestController.deleteRequest);
router.post('/range-data', RequestController.getRequestsByDateRange);
router.post('/sum-importo', RequestController.getSumImportoByDateRange);
router.post('/average-rate', RequestController.getAverageRateByDateRange);

// Altri endpoint possono essere aggiunti qui

export default router;
