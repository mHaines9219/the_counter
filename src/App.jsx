import React, { useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/process-url', {
        url,
      });
      console.log(response.data);
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults(['Error fetching data']);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {results && (
        <div>
          <h2>Results:</h2>
          <ul>{results.length}</ul>
        </div>
      )}
    </div>
  );
}

export default App;
