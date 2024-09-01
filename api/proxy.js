export default async function handler(req, res) {
  // Construct the target URL using the original request URL
  const targetUrl = 'http://developement.eba-nmagbysq.us-east-1.elasticbeanstalk.com' + req.url;

  // Forward the request to the target URL
  const response = await fetch(targetUrl, {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined
  });

  // Capture and forward the response back to the client
  const data = await response.text(); // Use .text() to handle both JSON and other content types

  // Set the same status code as the target response
  res.status(response.status).send(data);
}

