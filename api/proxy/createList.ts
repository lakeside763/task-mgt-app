import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function createList(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

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
}
