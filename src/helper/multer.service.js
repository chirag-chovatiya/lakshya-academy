import multer from "multer";
import * as ftp from "basic-ftp";
import { Readable } from "stream";
import path from "path";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handleUpload = async (files, folderName) => {
  const client = new ftp.Client();
  
  const ftpConfig = {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    port: parseInt(process.env.FTP_PORT, 10) || 21,
  };

  try {
    await client.access(ftpConfig);
    
    const uploadedUrls = [];
    
    const folderPath = folderName ? `doctorImage/${folderName}/` : "doctorImage/";
    await client.ensureDir(folderPath);
    
    for (const file of files) {
      const remoteFileName = path.basename(file.originalname);
      const remoteFilePath = path.join(folderPath, remoteFileName);
      const newRemotePath = remoteFilePath
        .replace(/\\/g, "/")
        .replace("doctorImage/", "");

      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);

      await client.uploadFrom(readableStream, remoteFileName);

      const imgUrl = `http://medaura.co.in/${newRemotePath}`;
      uploadedUrls.push(imgUrl);
    }

    if (uploadedUrls.length === 1) {
      return uploadedUrls[0];
    } else {
      return uploadedUrls;
    }
  } catch (error) {
    console.log("Error uploading to FTP:", error);
    throw new Error("Error uploading to FTP");
  } finally {
    await client.close();
  }
};

export { upload, handleUpload };