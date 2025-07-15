import React, { useEffect, useState } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/api/quotes')
      .then(res => res.json())
      .then(setQuotes);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    .then(res => res.json())
    .then(newQuote => {
      setQuotes([...quotes, newQuote]);
      setText('');
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>💬 DevQuotes</h1>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Enter a quote" />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {quotes.map((q, i) => <li key={i}>{q.text}</li>)}
      </ul>
    </div>
  );
}

export default App;

