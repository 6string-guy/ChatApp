import express from 'express'
import { accessChat } from '../controllers/chatControllers';
import { protect } from '../middleware/authMiddleware';
const router = express.Router();


router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createdGroupChat);
//because database is being updated we have put request
router.route('/rename').put(protect, renameGroup);
router.route('/groupremove').put(protect, removeFromGroup);
router.route('/groupadd').put(protect, addToGroup);



export default router;