import { buildFeedbackPath, extractFeedbackData } from '.';
function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const data = extractFeedbackData(filePath);
  const feedback = data.find((feedback) => feedback.id === feedbackId);
  if (!feedback) {
    res.status(404).json({ message: 'Feedback not found' });
  } else {
    res.status(200).json({ feedback });
  }
}

export default handler;
