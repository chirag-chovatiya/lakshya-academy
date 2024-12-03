import multer from "multer";
import path from "path";
import fs from "fs";

// Set up multer storage to save files to memory (for later processing)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API config to disable default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Function to handle file upload and store locally
const handleUpload = async (files, folderName) => {
  const uploadedUrls = [];

  // Define the local folder path to store images
  const folderPath = folderName ? `uploads/doctorImage/${folderName}/` : "uploads/doctorImage/";

  // Ensure that the folder exists, create it if not
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Loop through the uploaded files
  for (const file of files) {
    // Generate the file path for local storage
    const localFilePath = path.join(folderPath, file.originalname);

    // Write the file to the local system
    fs.writeFileSync(localFilePath, file.buffer);

    // Generate a URL or path to the uploaded image
    const imgUrl = `http://yourdomain.com/${localFilePath.replace("uploads/", "")}`;
    uploadedUrls.push(imgUrl);
  }

  // Return a single URL or an array of URLs based on the number of files uploaded
  if (uploadedUrls.length === 1) {
    return uploadedUrls[0];
  } else {
    return uploadedUrls;
  }
};

export { upload, handleUpload };
