import { useState } from 'react';
import axios from 'axios';
import './FieldAndResults.css';

export default function FieldAndResults() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  console.log('FieldAndResults');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Evt handler');
    try {
      console.log('Evt handler inblock');

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

  const getResultMessage = () => {
    if (!results || results === 0) {
      return '😩 No "the"s found on this page. 😩';
    } else if (results === 1) {
      return '😐 There is 1 "the" on this page. 😐';
    } else if (results < 1000) {
      return `😲 There are ${results} "the"s on this page, wow! 😲`;
    } else if (results > 1000) {
      return `🤖 Holy Moly! There's ${results} "the"s on this page! Overload! 🤖`;
    }
  };
  return (
    <>
      {' '}
      <div id="mid-row">
        <form id="submit-field" onSubmit={handleSubmit}>
          <label>
            <input
              id="url-field"
              type="text"
              placeholder="ENTER URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
          <button id="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div id="bot-row">
        <h1 id="results">RESULTS:</h1>
        {results && (
          <div>
            <h2 className="results-msg">{getResultMessage()}</h2>
          </div>
        )}
      </div>
    </>
  );
}
