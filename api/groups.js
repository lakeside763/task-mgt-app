import fetch from 'node-fetch';

export default async function handleGroups(req, res) {
  if (req.method === 'GET') {
    // Handle GET request - Fetch Groups
    try {
      const response = await fetch(`${process.env.BASE_URL}/groups`);

      if (!response.ok) {
        throw new Error('Failed to fetch groups');
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    // Handle POST request - Create Group
    try {
      const groupData = req.body;

      const response = await fetch(`${process.env.BASE_URL}/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupData),
      });

      if (!response.ok) {
        throw new Error('Failed to create group');
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
