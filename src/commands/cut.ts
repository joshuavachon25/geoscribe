import cv from '@techstark/opencv-js';
import fs from 'fs';
import {createCanvas, loadImage} from "canvas";
import path from 'path'
import {execFile} from 'node:child_process'

export const processWithExecutable = (imagePath: string, outputDir: string) => {
    const scriptPath = path.resolve(__dirname, '../scripts/cut_images.exe'); // Path to your compiled Python executable

    execFile(scriptPath, [imagePath, outputDir], (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing standalone script:', error);
            return;
        }
        console.log('Script output:', stdout);
        if (stderr) console.error('Script errors:', stderr);
    });
};


// // Preprocess the image
// export const preprocessImage = (imagePath: string): cv.Mat => {
//     const src = cv.imread(imagePath); // Read image
//     const gray = new cv.Mat();
//     cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0); // Convert to grayscale
//
//     const binary = new cv.Mat();
//     cv.threshold(gray, binary, 128, 255, cv.THRESH_BINARY); // Binarize image
//
//     gray.delete();
//     return binary;
// };

// Detect document structure and divide into sub-images
// export const detectAndDivide = (binary: cv.Mat, outputDir: string): void => {
//     // Apply morphological transformations to detect text blocks
//     const kernel = cv.Mat.ones(1, 20, cv.CV_8U); // Horizontal kernel for column detection
//     const morphed = new cv.Mat();
//     cv.morphologyEx(binary, morphed, cv.MORPH_CLOSE, kernel);
//
//     // Find contours
//     const contours = new cv.MatVector();
//     const hierarchy = new cv.Mat();
//     cv.findContours(morphed, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
//
//     // Loop through contours and save sub-images
//     for (let i = 0; i < contours.size(); i++) {
//         const rect = cv.boundingRect(contours.get(i));
//         const region = binary.roi(rect); // Extract region of interest
//
//         const outputPath = `${outputDir}/sub_image_${i + 1}.png`;
//         cv.imwrite(outputPath, region); // Save sub-image
//         console.log(`Saved: ${outputPath}`);
//
//         region.delete();
//     }
//
//     // Cleanup
//     morphed.delete();
//     kernel.delete();
//     contours.delete();
//     hierarchy.delete();
// };

// export const processDocument = async (inputImage: string, outputDir: string) => {
//     // Wait for OpenCV to initialize
//     await new Promise<void>((resolve) => {
//         cv['onRuntimeInitialized'] = () => resolve();
//     });
//
//     // Load the image
//     const src = await loadImageForOpenCV(inputImage);
//
//     // Preprocess the image (convert to grayscale and binarize)
//     const gray = new cv.Mat();
//     cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
//
//     const binary = new cv.Mat();
//     cv.threshold(gray, binary, 128, 255, cv.THRESH_BINARY);
//
//     // Detect and save sub-images
//     const kernel = cv.Mat.ones(1, 20, cv.CV_8U);
//     const morphed = new cv.Mat();
//     cv.morphologyEx(binary, morphed, cv.MORPH_CLOSE, kernel);
//
//     const contours = new cv.MatVector();
//     const hierarchy = new cv.Mat();
//     cv.findContours(morphed, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
//
//     if (!fs.existsSync(outputDir)) {
//         fs.mkdirSync(outputDir);
//     }
//
//     for (let i = 0; i < contours.size(); i++) {
//         const rect = cv.boundingRect(contours.get(i));
//         const region = binary.roi(rect);
//
//         const outputPath = `${outputDir}/sub_image_${i + 1}.png`;
//         saveImage(outputPath, region);
//
//         region.delete();
//     }
//
//     // Cleanup
//     src.delete();
//     gray.delete();
//     binary.delete();
//     kernel.delete();
//     morphed.delete();
//     contours.delete();
//     hierarchy.delete();
//
//     console.log('Processing complete!');
// };
//
// const saveImage = (outputPath: string, mat: cv.Mat) => {
//     const canvas = createCanvas(mat.cols, mat.rows);
//     const ctx = canvas.getContext('2d');
//     const imgData = ctx.createImageData(mat.cols, mat.rows);
//
//     for (let i = 0; i < imgData.data.length; i += 4) {
//         const index = i / 4;
//         imgData.data[i] = mat.data[index];
//         imgData.data[i + 1] = mat.data[index];
//         imgData.data[i + 2] = mat.data[index];
//         imgData.data[i + 3] = 255; // Alpha
//     }
//
//     ctx.putImageData(imgData, 0, 0);
//
//     const buffer = canvas.toBuffer('image/png');
//     fs.writeFileSync(outputPath, buffer);
//     console.log(`Saved image to ${outputPath}`);
// };
// const initializeOpenCV = async () => {
//     return new Promise<void>((resolve, reject) => {
//         cv['onRuntimeInitialized'] = () => {
//             console.log('OpenCV initialized');
//             resolve();
//         };
//     });
// };
//
// export const loadImageForOpenCV = async (imagePath: string): Promise<cv.Mat> => {
//     // Load the image using `canvas`
//     const img = await loadImage(imagePath);
//     const canvas = createCanvas(img.width, img.height);
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(img, 0, 0);
//
//     // Use OpenCV's imread with the canvas element
//     const mat = cv.imread(canvas); // Read the canvas into an OpenCV Mat
//     return mat;
// };