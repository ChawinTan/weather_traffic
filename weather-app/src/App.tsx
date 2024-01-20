import React from 'react';
import Date from './datetimepickers/date'
import Time from './datetimepickers/time';

import './App.css';

function App() {
  return (
      <div className="App">
          <div className="picker-wrapper">
            <Date />
            <Time />
        </div>
    </div>
  );
}

export default App;
