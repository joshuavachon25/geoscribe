import { processImages } from '../utils/image-processor';
import cv from '@techstark/opencv-js';

// Wait for OpenCV to load
const initializeOpenCV = async () => {
    return new Promise<void>((resolve, reject) => {
        cv['onRuntimeInitialized'] = () => {
            console.log('OpenCV initialized');
            resolve();
        };
    });
};
export const processImagesCommand = (inputDir: string, outputDir: string) => {
    console.log(`Processing images from ${inputDir} and saving to ${outputDir}...`);
    processImages(inputDir, outputDir)
        .then(() => console.log('Image processing complete!'))
        .catch((err) => console.error('Error during image processing:', err));
};