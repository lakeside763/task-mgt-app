// api/test.js

export default function handler(req, res) {
  const staticData = {
    success: true,
    message: "This is a test response",
    data: [
      { id: 1, task: "Do laundry" },
      { id: 2, task: "Read a book" },
      { id: 3, task: "Go for a run" }
    ]
  };
  res.status(200).json(staticData);
}