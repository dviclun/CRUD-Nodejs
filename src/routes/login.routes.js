"use strict";

import {Router} from 'express';
import conexion from '../mysql_connector.js';


const router = Router();

router.get("/login", async (req, res)=> {
   const result = await conexion.query("SELECT 1+1 AS result");

   res.json(result[0]);
});

export default router;