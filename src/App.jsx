import React, { useState } from 'react';
import axios from 'axios';

import './App.css';
import Banner from './components/Banner/Banner';
import FieldAndResults from './components/FieldAndResults/FieldAndResults';

function App() {
  return (
    <div id="main-wrapper">
      <Banner />
      <FieldAndResults />
    </div>
  );
}

export default App;
