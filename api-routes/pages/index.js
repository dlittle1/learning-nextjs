import { useRef, useState } from 'react';
import Link from 'next/link';

function HomePage() {
  const [feedback, setFeedback] = useState([]);

  const emailRef = useRef();
  const feedbackRef = useRef();

  function submitForm(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const feedback = feedbackRef.current.value;

    const requestBody = {
      email,
      feedback,
    };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  function getFeedback() {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => setFeedback(data.feedback))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor='email'>Your Email Address</label>
          <br />
          <input type='email' id='email' ref={emailRef} />
        </div>
        <div>
          <label htmlFor='feedback'>Your Feedback</label>
          <br />
          <textarea id='feedback' rows='5' ref={feedbackRef} />
        </div>
        <button type='submit'>Submit Feedback</button>
      </form>
      <hr />
      <Link href='/feedback'>
        <button>View Feedback Page</button>
      </Link>
      <br />
      <button onClick={getFeedback}>Get Feedback</button>
      <ul>
        {feedback.map((feedback) => (
          <li key={feedback.id}>
            <h3>{feedback.email}</h3>
            <p>{feedback.feedback}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
