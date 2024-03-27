import express from "express";
import controller from '../controllers/categoty.js';
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.delete('/:id', controller.remove);
router.post('/', controller.create);
router.patch('/:id', controller.update);

export default router;