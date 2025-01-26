import { Command } from 'commander';
import { processImagesCommand } from './commands/process-images';
import { ocrCommand } from './commands/ocr';
import { cleanDataCommand } from './commands/clean-data';
import { geolocateCommand } from './commands/geolocate';
import {processDocument, processWithExecutable} from "./commands/cut";

const program = new Command();

program
    .name('GeoScribe')
    .description('A CLI tool for processing archival images, extracting text, cleaning data, and geolocating addresses.')
    .version('1.0.0');

program
    .command('image')
    .description('Improve image quality and prepare them for OCR.')
    .argument('<inputDir>', 'Directory containing the images')
    .argument('<outputDir>', 'Directory to save processed images')
    .action(processImagesCommand);

program
    .command('ocr')
    .description('Extract text from images using OCR.')
    .argument('<imageDir>', 'Directory containing the images')
    .argument('<outputFile>', 'File to save extracted text')
    .action(ocrCommand);

program
    .command('clean')
    .description('Clean and correct extracted text data using a dictionary.')
    .argument('<inputFile>', 'File containing extracted text')
    .argument('<dictionaryFile>', 'File containing the dictionary')
    .argument('<outputFile>', 'File to save cleaned data')
    .action(cleanDataCommand);

program
    .command('cut <imagePath> <outputDir>')
    .description('Detect document structure and split into sub-images')
    .action(async (imagePath, outputDir) => {
        try {
            await processWithExecutable(imagePath, outputDir);
            console.log('Processing complete!');
        } catch (error) {
            console.error('Error:', error);
        }
    });

program
    .command('locator')
    .description('Geolocate addresses found in the text data.')
    .argument('<inputFile>', 'File containing cleaned data with addresses')
    .argument('<outputFile>', 'File to save geolocated data')
    .action(geolocateCommand);

program.parse(process.argv);