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
    <div id="main-wrapper">
      <div id="top-row">
        <h1>
          THE <span>THE</span> COUNTER
        </h1>
      </div>

      <div id="mid-row">
        <form id="submit-field" onSubmit={handleSubmit}>
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
      </div>

      <div id="bot-row">
        {results && (
          <div>
            <h2 id="results">RESULTS:</h2>
            <h4>There are {results.length} thes on this page, wow!</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
