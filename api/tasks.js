import fetch from 'node-fetch';

const BASE_URL="http://developement.eba-nmagbysq.us-east-1.elasticbeanstalk.com"

export default async function handler(req, res) {
  try {
    const response = await fetch(`${BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

export default async function handleTasks(req, res) {
  if (req.method === 'GET') {
    // Handle GET request - Fetch Tasks
    try {
      const response = await fetch(`${BASE_URL}/tasks`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    // Handle POST request - Create Task
    try {
      const taskData = req.body;

      const response = await fetch(`${process.env.BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
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
