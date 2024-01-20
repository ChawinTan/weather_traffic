import React from 'react';
import Date from './datetimepickers/date'
import Time from './datetimepickers/time';
import Locations from './locations';

import './App.css';

function App() {
  const [date, setDate] = React.useState<string | null>('')
  const [time, setTime] = React.useState<string | null>('')
  const [location, setLocation] = React.useState<Array<string>>([]);
  const [traffic, setTraffic] = React.useState<Array<string>>([]);

  return (
      <div className="App">
          <div className="picker-wrapper">
            <Date value={date} setDate={setDate} />
            <Time value={time} setTime={setTime} />
        </div>

        <div>
          Location
          <Locations location={location} setLocation={setLocation} traffic={traffic} setTraffic={setTraffic} />
        </div>
    </div>
  );
}

export default App;
