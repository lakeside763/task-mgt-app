import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handleLists(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    // Handle GET request - Fetch Lists
    try {
      const response = await fetch(`${process.env.BASE_URL}/lists`);

      if (!response.ok) {
        throw new Error('Failed to fetch lists');
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    // Handle POST request - Create List
    try {
      const listData = req.body;

      const response = await fetch(`${process.env.BASE_URL}/lists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listData),
      });

      if (!response.ok) {
        throw new Error('Failed to create list');
      }

      const data = await response.json();
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
