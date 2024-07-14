import multer from "multer";

import { allowedExtensions } from "../utils/allowedExtensions.js";
import generateUniqueString from "../utils/generateUniqueString.js";
import path from 'path' 
import fs from 'fs'
// export const mullterMiddleHost = ({ extension = allowedExtensions.image }) => {
//   const storage = multer.diskStorage({});

//   const fileFilter = (req, file, cb) => {
//     // Extract the file extension
//     const fileExtension = file.originalname.split('.').pop().toLowerCase();

//     // Check if the file extension is allowed
//     if (extension.includes(fileExtension)) {
//       // Allow the file
//       return cb(null, true);
//     } else {
//       // Reject the file with an error message
//       return cb(new Error("Invalid file extension"));
//     }
    
//   };
//   const file = multer({ fileFilter, storage });
//   return file;
// };
export const mullterMiddleHost = ({
  extensions = allowedExtensions.image,
  filePath = 'general'
}) => {

  const destinationPath = path.resolve(`../Images/uploads/${filePath}`) // return the full path till the src/uploads/${filePath}

  // path check
  if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true })
  }
  // diskStorage
  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, destinationPath)
      },
      filename: (req, file, cb) => {
          const uniqueFileName = generateUniqueString(6) + '_' + file.originalname
          cb(null, uniqueFileName)
      }
  })

  // file Filter
  const fileFilter = (req, file, cb) => {
      if (extensions.includes(file.mimetype.split('/')[1].split('+')[0])) {
          return cb(null, true)
      }
      console.log(file.mimetype.split('/')[1]);
      cb(new Error('Image format is not allowed!'), false)
  }


  const file = multer({ fileFilter, storage })
  return file
}
