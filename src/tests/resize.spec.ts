import path from 'path';
import { resizeImage } from '../utils/imageProcessor';

describe('Image Processor', () => {
  it('should resize the image', async () => {
    const imageDir = path.join(__dirname, '../../images');
    const processedDir = path.join(__dirname, '../../images/processed');
    await resizeImage(imageDir, processedDir, 200, 200);
  });
});
