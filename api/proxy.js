export default async function handler(req, res) {
  const response = await fetch('http://developement.eba-nmagbysq.us-east-1.elasticbeanstalk.com' + req.url);
  const data = await response.json();
  res.status(response.status).json(data);
}
