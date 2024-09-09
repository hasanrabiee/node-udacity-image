import express, { Request, Response } from 'express';
import path from 'path';
import { resizeImage } from '../utils/imageProcessor';
import fs from 'fs';

const router = express.Router();

router.get('/resize', async (req: Request, res: Response) => {
  const { filename, width, height } = req.query;

  const imageDir = path.join(__dirname, '../../images');
  const processedDir = path.join(__dirname, '../../images/processed');
  if (!filename || !width || !height) {
    return res
      .status(400)
      .send('Error: Missing required parameters (filename, width, height)');
  }

  const widthNum = parseInt(width as string, 10);
  const heightNum = parseInt(height as string, 10);

  if (isNaN(widthNum) || isNaN(heightNum) || widthNum <= 0 || heightNum <= 0) {
    return res.status(400).send('Error: Invalid width or height');
  }

  const inputFile = path.join(imageDir, `${filename}.jpg`);
  const outputFile = path.join(
    processedDir,
    `${filename}-${width}x${height}.jpg`,
  );

  if (!fs.existsSync(inputFile)) {
    return res.status(404).send('Error: Image not found');
  }

  try {
    const resizedImage = await resizeImage(
      inputFile,
      outputFile,
      widthNum,
      heightNum,
    );
    return res.sendFile(resizedImage);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Error: Failed to process the image');
  }
});

export default router;
