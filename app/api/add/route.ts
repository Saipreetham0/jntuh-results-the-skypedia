// app/api/router.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Define the path to the JSON file
const dataPath = path.join(process.cwd(), 'data', 'courses.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const newLink = req.body; // Expecting new link data in the request body

            // Read the existing JSON file
            const data = await fs.promises.readFile(dataPath, 'utf-8');
            const jsonData = JSON.parse(data);

            // Add the new link to the JSON data
            jsonData.children.push(newLink);

            // Write the updated data back to the JSON file
            await fs.promises.writeFile(dataPath, JSON.stringify(jsonData, null, 2), 'utf-8');

            // Respond with the updated JSON data
            res.status(200).json(jsonData);
        } catch (error) {
            console.error('Error updating JSON file:', error);
            res.status(500).json({ error: 'Failed to update the JSON file' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
