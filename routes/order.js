import express from "express";
import controller from '../controllers/order.js';
const router = express.Router();

router.get('/', controller.getAll);
router.post('/', controller.create);

export default router;

