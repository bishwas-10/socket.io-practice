import express from "express";
import getUser from "../controllers/getUser";
import authUser from "../middleware/authUser";
import refresh from "../utils/refresh";

const router = express.Router();

router.get("/", authUser, getUser);

export default router;
