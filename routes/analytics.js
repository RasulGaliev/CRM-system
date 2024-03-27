import express from "express";
import controller from '../controllers/analytics.js';
const router = express.Router();

router.get('/overview', controller.overview);
router.get('/analytics', controller.analytics);

export default router;