import React, { useEffect, useState } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState('');

  useEffect(() => {
    fetch('/api/quotes')
      .then(res => res.json())
      .then(setQuotes);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newQuote })
    });
    const data = await res.json();
    setQuotes([...quotes, data]);
    setNewQuote('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>DevQuotes</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
          placeholder="Add a new quote"
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {quotes.map((q, i) => (
          <li key={i}>{q.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;