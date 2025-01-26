import fs from 'fs';
import axios from 'axios';

const GEOCODE_API_URL = 'https://api.opencagedata.com/geocode/v1/json';
const API_KEY = 'YOUR_API_KEY';

export const geolocateAddresses = async (inputFile: string, outputFile: string) => {
    const data = fs.readFileSync(inputFile, 'utf8');
    const addresses = data.split('\n').filter((line) => line.trim() !== '');

    const results: { address: string; lat: number; lng: number }[] = [];
    for (const address of addresses) {
        console.log(`Geolocating: ${address}`);
        try {
            const response = await axios.get(GEOCODE_API_URL, {
                params: {
                    q: address,
                    key: API_KEY,
                    limit: 1
                }
            });

            const { lat, lng } = response.data.results[0].geometry;
            results.push({ address, lat, lng });
        } catch (error) {
            console.error(`Failed to geolocate ${address}:`, error.message);
        }
    }

    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    console.log(`Geolocation results saved to ${outputFile}`);
};