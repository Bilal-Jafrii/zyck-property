import { Router } from "express"

import { newsletter , getAllEmails} from "../controllers/newsletter.controller.js"


const router = Router()


router.route("/newsletter").post(newsletter)
router.route("/emails").get(getAllEmails)


export default router 