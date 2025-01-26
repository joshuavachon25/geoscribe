import fs from 'fs';
import path from 'path';
import sharp from 'sharp'; // Library for image processing

export const processImages = async (inputDir: string, outputDir: string) => {
    const files = fs.readdirSync(inputDir);
    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file);

        await sharp(inputPath)
            .grayscale()
            .threshold(128)
            .toFile(outputPath);

        console.log(`Processed: ${file}`);
    }
};