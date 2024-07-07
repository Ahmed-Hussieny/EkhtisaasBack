import multer from "multer";

import { allowedExtensions } from "../utils/allowedExtensions.js";

export const mullterMiddleHost = ({ extension = allowedExtensions.image }) => {
  const storage = multer.diskStorage({});

  const fileFilter = (req, file, cb) => {
    // Extract the file extension
    const fileExtension = file.originalname.split('.').pop().toLowerCase();

    // Check if the file extension is allowed
    if (extension.includes(fileExtension)) {
      // Allow the file
      return cb(null, true);
    } else {
      // Reject the file with an error message
      return cb(new Error("Invalid file extension"));
    }
    
  };
  const file = multer({ fileFilter, storage });
  return file;
};
