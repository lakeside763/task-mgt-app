// api/test.js

export default function handler(req, res) {
  // Example static data
  const staticData = {
    success: true,
    message: "This is a test response",
    data: [
      { id: 1, task: "Do laundry" },
      { id: 2, task: "Read a book" },
      { id: 3, task: "Go for a run" }
    ]
  };

  // Return the static data as JSON
  res.status(200).json(staticData);
}