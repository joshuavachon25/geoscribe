import { performOCR } from '../utils/ocr-service';

export const ocrCommand = async (imageDir: string, outputFile: string) => {
    console.log(`Extracting text from images in ${imageDir}...`);
    await performOCR(imageDir, outputFile);
};