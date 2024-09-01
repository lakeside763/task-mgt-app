import fetch from 'node-fetch';

const baseURL = "http://developement.eba-nmagbysq.us-east-1.elasticbeanstalk.com";

export default async function handler(req, res) {
  try {
    const response = await fetch(`${baseURL}/tasks`);
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