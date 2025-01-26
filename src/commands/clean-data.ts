import { cleanData } from '../utils/data-cleaner';

export const cleanDataCommand = (inputFile: string, dictionaryFile: string, outputFile: string) => {
    console.log(`Cleaning data in ${inputFile} using dictionary ${dictionaryFile}...`);
    cleanData(inputFile, dictionaryFile, outputFile);
};