import { Router } from "express";

import { logParser } from "../controllers/logParserController";
import fileUploader from "../middlewares/fileUploader";

const router = Router();

router.post("/logParser/file", (req, res) => {
    // handle file upload and parsing here
    res.json({ success: true, message: "File received!" });
});

// router.route("/logParser/:fieldName").post(fileUploader, logParser);

export default router;
