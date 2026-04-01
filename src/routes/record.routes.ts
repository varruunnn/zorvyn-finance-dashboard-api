import { Router } from 'express';
import {
    createRecord,
    getRecords,
    getRecordById,
    updateRecord,
    deleteRecord
} from '../controllers/record.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.post('/', authorize(['ADMIN']), createRecord);
router.get('/', authorize(['ADMIN', 'ANALYST']), getRecords);
router.get('/:id', authorize(['ADMIN', 'ANALYST']), getRecordById);
router.put('/:id', authorize(['ADMIN']), updateRecord);
router.delete('/:id', authorize(['ADMIN']), deleteRecord);

export default router;