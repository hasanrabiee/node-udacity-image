import sharp from 'sharp';
import fs from 'fs';

export const resizeImage = async (
  inputFile: string,
  outputFile: string,
  width: number,
  height: number,
): Promise<string> => {
  if (fs.existsSync(outputFile)) {
    return outputFile;
  }

  try {
    await sharp(inputFile).resize(width, height).toFile(outputFile);
    return outputFile;
  } catch (error) {
    console.log(error);
    throw new Error('Error processing the image');
  }
};
