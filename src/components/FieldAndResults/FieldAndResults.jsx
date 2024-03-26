import { useState } from 'react';
import axios from 'axios';
import './FieldAndResults.css';

export default function FieldAndResults() {
  const [url, setUrl] = useState('');
  const [wordToSearch, setWordToSearch] = useState('');
  const [results, setResults] = useState(null);
  const [submittedWord, setSubmittedWord] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('process-url', {
        url,
        wordToSearch,
      });
      setResults(response.data.results);
      setSubmittedWord(wordToSearch); // Disable the input field after the axios call
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults(['Error fetching data']);
    }
  };

  const getResultMessage = () => {
    if (results === 0) {
      return `😩 No "${submittedWord}"s found on this page. 😩`;
    } else if (results === 1) {
      return `😐 There is 1 "${submittedWord}" on this page. 😐`;
    } else if (results < 1000) {
      return `😲 There are ${results} "${submittedWord}"s on this page, wow! 😲`;
    } else if (results > 1000) {
      return `🤖 Holy Moly! There's ${results} "${submittedWord}"s on this page! Overload! 🤖`;
    }
  };
  return (
    <>
      {' '}
      <div id="mid-row">
        <form id="submit-field" onSubmit={handleSubmit}>
          <label>
            <input
              id="word-field"
              type="text"
              placeholder="ENTER WORD"
              value={wordToSearch}
              onChange={(e) => setWordToSearch(e.target.value)}
            />
          </label>
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
        {results !== null && results !== undefined && (
          <div>
            <h2 className="results-msg">{getResultMessage()}</h2>
          </div>
        )}
      </div>
    </>
  );
}
