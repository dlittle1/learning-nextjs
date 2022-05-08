import { useState } from 'react';
import { buildFeedbackPath, extractFeedbackData } from './api/feedback';

const FeedbackPage = (props) => {
  const [feedback, setFeedback] = useState(props.feedback);
  const [feedbackData, setFeedbackData] = useState({});

  const loadFeedback = (id) => {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data.feedback))
      .catch((err) => console.log(err));
  };

  return (
    <ul>
      {feedback.map((feedback) => (
        <li key={feedback.id}>
          <h3>{feedback.feedback}</h3>
          <button onClick={() => loadFeedback(feedback.id)}>
            Load Feedback
          </button>
          {feedbackData && feedbackData.id === feedback.id && (
            <div>
              <p>{feedbackData.email}</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const feedbackPath = buildFeedbackPath();
  const feedback = await extractFeedbackData(feedbackPath);

  return {
    props: {
      feedback,
    },
  };
}

export default FeedbackPage;
