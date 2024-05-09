import { Router } from "express";
import { getdata } from "../controllers/aidata.controllers.js";


const openairoutes = Router()

openairoutes.route("/prompt").post(getdata)


export default openairoutes