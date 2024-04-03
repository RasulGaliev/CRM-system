import express from "express";
import controller from '../controllers/position.js';
import passport from "passport";
const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), controller.getByCategoryId);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);

export default router;

