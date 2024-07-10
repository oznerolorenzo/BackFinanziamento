import { Router } from 'express';
import { body, query } from 'express-validator';
import RequestController from '../controller/controller-request';

const router: Router = Router();

router.get('/lista', [
  query('max').optional().isInt({ min: 1 }).withMessage('Max must be a positive integer')
], RequestController.getAllRequests);

router.post('/create', [
    body('cognomeNomeRichiedente').notEmpty().withMessage('CognomeNomeRichiedente is required'),
    body('importo').isFloat({ gt: 0 }).withMessage('Importo must be a positive number'),
    body('numeroRate').isInt({ gt: 0 }).withMessage('NumeroRate must be a positive integer'),
    body('dataInserimentoRichiesta').optional().isISO8601().withMessage('DataInserimentoRichiesta must be a valid date')
  ], RequestController.createRequest);

router.get('/cerca', [
  query('search').notEmpty().withMessage('Search parameter is required')
], RequestController.searchRequests);

router.put('/update/:id', [
  body('cognomeNomeRichiedente').notEmpty().withMessage('CognomeNomeRichiedente is required'),
  body('dataInserimentoRichiesta').isISO8601().withMessage('DataInserimentoRichiesta must be a valid date'),
  body('importo').isFloat({ gt: 0 }).withMessage('Importo must be a positive number'),
  body('numeroRate').isInt({ gt: 0 }).withMessage('NumeroRate must be a positive integer')
], RequestController.updateRequest);

router.delete('/delete/:id', [
  query('id').isInt().withMessage('ID must be a valid integer')
], RequestController.deleteRequest);

router.post('/daterange', [
  body('dataMin').isISO8601().withMessage('DataMin must be a valid date'),
  body('dataMax').isISO8601().withMessage('DataMax must be a valid date'),
  body('max').optional().isInt({ min: 1 }).withMessage('Max must be a positive integer')
], RequestController.getRequestsByDateRange);

router.post('/sum-importo', [
  body('dataMin').isISO8601().withMessage('DataMin must be a valid date'),
  body('dataMax').isISO8601().withMessage('DataMax must be a valid date')
], RequestController.getSumImportoByDateRange);

router.post('/average-rate', [
  body('dataMin').isISO8601().withMessage('DataMin must be a valid date'),
  body('dataMax').isISO8601().withMessage('DataMax must be a valid date')
], RequestController.getAverageRateByDateRange);

export default router;
