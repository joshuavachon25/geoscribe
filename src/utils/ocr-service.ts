import fs from 'fs';
import { createWorker } from 'tesseract.js';

export const performOCR = async (imageDir: string, outputFile: string): Promise<void> => {
    const files = fs.readdirSync(imageDir); // Liste des fichiers dans le répertoire
    const worker = await createWorker('fra'); // Crée un worker

    try {
        let results = '';
        for (const file of files) {
            console.log(`Processing file: ${file}`);
            const { data: { text } } = await worker.recognize(`${imageDir}/${file}`);
            results += `File: ${file}\n${text}\n\n`;
        }

        fs.writeFileSync(outputFile, results); // Écrit les résultats dans un fichier
        console.log(`OCR results saved to ${outputFile}`);
    } catch (error) {
        console.error('Error during OCR:', error);
    } finally {
        await worker.terminate(); // Termine le worker
    }
};
