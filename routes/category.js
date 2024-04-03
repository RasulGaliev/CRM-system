import express from "express";
import upload from "../middleware/upload.js"
import controller from '../controllers/categoty.js';
import passport from "passport";
const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }),  controller.getById);
router.delete('/:id', passport.authenticate('jwt', { session: false }),  controller.remove);
router.post('/', passport.authenticate('jwt', { session: false }),  upload.single('image'), controller.create);
router.patch('/:id', passport.authenticate('jwt', { session: false }),  upload.single('image'), controller.update);

export default router;