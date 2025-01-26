import fs from 'fs';

export const cleanData = (inputFile: string, dictionaryFile: string, outputFile: string) => {
    const text = fs.readFileSync(inputFile, 'utf8');
    const dictionary = JSON.parse(fs.readFileSync(dictionaryFile, 'utf8')) as Record<string, string>;

    const cleanedText = text.split('\n').map((line) => {
        return line
            .split(' ')
            .map((word) => dictionary[word.toLowerCase()] || word)
            .join(' ');
    }).join('\n');

    fs.writeFileSync(outputFile, cleanedText);
    console.log(`Cleaned data saved to ${outputFile}`);
};