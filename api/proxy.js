import fetch from 'node-fetch';

export default async function handler(req, res) {
  const targetUrl = 'http://developement.eba-nmagbysq.us-east-1.elasticbeanstalk.com' + req.url.replace('/api/proxy', '');

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: new URL(targetUrl).host, // ensure the correct host header is sent
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    console.error('Error connecting to the target API:', error);
    res.status(500).json({ error: 'Failed to connect to the target API' });
  }
}


