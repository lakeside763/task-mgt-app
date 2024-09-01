import fetch from 'node-fetch';

export default async function handleTasks(req, res) {
  if (req.method === 'GET') {
    // Handle GET request - Fetch Tasks
    try {
      const response = await fetch(`${process.env.BASE_URL}/tasks`);

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
