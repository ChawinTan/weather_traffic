import React from 'react';
import Date from './datetimepickers/date'
import Time from './datetimepickers/time';
import Locations from './locations';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import './App.css';

interface TrafficDataType {
  lat: string;
  lon: string;
  imgUrl: string;
}

const getLocations = async (
    trafficData: Array<TrafficDataType>, 
    locationList:Array<string>, 
    setLocation: React.Dispatch<React.SetStateAction<string[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
  for (let i=0; i < trafficData.length; i++) {
    const response = await fetch(`http://localhost:3001/location?lat=${trafficData[i].lat}&lon=${trafficData[i].lon}`, {
      method: 'POST',
    })
    const json = await response.text()
    locationList.push(json)
  }
  setLocation(locationList)
  setLoading(false)
}

const onClickGetTrafficImg = (
    date: string | null, 
    time: string | null, 
    setTraffic: React.Dispatch<React.SetStateAction<TrafficDataType[]>>, 
    locationList: Array<string>, 
    setLocation: React.Dispatch<React.SetStateAction<string[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
  setLoading(true);
  setLocation([]);
  fetch(`http://localhost:3001/traffic?date=${date}&time=${time}`,{
    method: 'POST',
  })
  .then(res => res.json())
  .then((json: any) => {
    setTraffic(json)
    return getLocations(json, locationList, setLocation, setLoading)
  })
}

function App() {
  const [date, setDate] = React.useState<string | null>('')
  const [time, setTime] = React.useState<string | null>('')
  const [location, setLocation] = React.useState<Array<string>>([]);
  const [traffic, setTraffic] = React.useState<Array<TrafficDataType>>([]);
  const [loading, setLoading] = React.useState<boolean>(false)

  return (
      <div className="App">
          <div className="picker-wrapper">
            <div className='date-picker'>
              <Date value={date} setDate={setDate}/>
            </div>
            <Time value={time} setTime={setTime} />
        </div>
        <div className='search-button'>
          <Button variant="contained" onClick={() => onClickGetTrafficImg(date, time, setTraffic, [], setLocation, setLoading)}>Get Traffic Images</Button>
        </div>
        <div className='location-list'>
          {loading && <CircularProgress />}
          {
            location.length === 0 ? <div>Search traffic locations</div> : <Locations location={location}  traffic={traffic} />
          }
        </div>
    </div>
  );
}

export default App;
