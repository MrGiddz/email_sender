import express from "express"; 
import {main} from "./mailer.js";


const router = express.Router();

router.post('/', main)

export default router;