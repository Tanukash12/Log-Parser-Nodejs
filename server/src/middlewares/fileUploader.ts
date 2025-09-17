import { NextFunction, Request, Response } from "express";
import multer, { MulterError } from "multer";

const upload = multer({ dest: "uploads/" });

const fileUploader = (req: Request, res: Response, next: NextFunction) => {
  const fieldName = req.params.fieldName; // :fieldName route param se aayega

  const singleUpload = upload.single(fieldName);

  singleUpload(req, res, (err: any) => {
    if (err instanceof MulterError) {
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      return res.status(500).json({ success: false, message: "File upload error" });
    }
    next(); // Agar sab sahi hai to controller me jao
  });
};

export default fileUploader;
