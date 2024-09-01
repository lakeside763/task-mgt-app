import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function getLists(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

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
}
