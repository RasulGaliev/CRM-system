import express from "express";
import controller from '../controllers/position.js';
const router = express.Router();

router.get('/', controller.getByCategoryId);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;

