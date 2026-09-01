import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env.test into process.env before anything else
dotenv.config({ path: path.resolve(__dirname, '../.env.test') , quiet: true,});
