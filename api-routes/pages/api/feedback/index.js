import fs from 'fs';
import path from 'path';

export function buildFeedbackPath() {
  const filePath = path.join(process.cwd(), 'data', 'feedback.json');
  return filePath;
}

export function extractFeedbackData(filePath) {
  const fileData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedback = req.body.feedback;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    const filePath = buildFeedbackPath();
    const data = extractFeedbackData(filePath);
    data.push(newFeedback);

    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback: newFeedback,
    });
  } else if (req.method === 'GET') {
    const filePath = buildFeedbackPath();
    const data = extractFeedbackData(filePath);

    res.status(200).json({ feedback: data });
  } else {
    res.status(200).json({ message: 'Feedback endpoint' });
  }
}

export default handler;
