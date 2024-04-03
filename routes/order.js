import express from "express";
import controller from '../controllers/order.js';
import passport from "passport";
const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);

export default router;

