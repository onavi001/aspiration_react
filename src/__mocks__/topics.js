import { readFileSync } from 'fs';
import path from 'path';

export const topics = JSON.parse(
    readFileSync(path.join(__dirname,'api.json')).toString()
);