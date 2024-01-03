import express from "express";
import { logIn, signUp,signOut } from "../controllers/users";


const router = express.Router();

router.post('/login',logIn);
router.post('/signup',signUp);
router.get('/signout',signOut);



export default router;