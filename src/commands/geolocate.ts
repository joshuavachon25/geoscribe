import { geolocateAddresses } from '../utils/geolocator';

export const geolocateCommand = async (inputFile: string, outputFile: string) => {
    console.log(`Geolocating addresses in ${inputFile}...`);
    await geolocateAddresses(inputFile, outputFile);
};