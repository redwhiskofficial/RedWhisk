import express from 'express';
import { loginUser,registerUserorManager } from '../controllers/authController.js';


const router = express.Router();
router.post('/login', loginUser);
router.post('/register', registerUserorManager);

export default router;