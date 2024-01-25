import React from 'react';
import Button from '@mui/material/Button';

import { TrafficDataType } from '../App';
import './index.css'

interface LocationProps {
  location: Array<string>;
  traffic: Array<TrafficDataType>;
}

interface SelectedImg {
  url: string;
  index: number;
}

interface WeatherProps {
  area: string;
  forecast: string;
}

const handleSetImage = (
    index: number, 
    url: string, 
    setSelectedImg: React.Dispatch<React.SetStateAction<SelectedImg | null>>
  ) => {
    const imgObj = {
      index,
      url
    }
    setSelectedImg(imgObj)
}

const getWeather = (
  lat: string, 
  lon: string, 
  setWeather: React.Dispatch<React.SetStateAction<WeatherProps | null>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>) => {
  fetch(`http://localhost:3001/weather?lat=${lat}&lon=${lon}`,{
    method: 'POST',
  }).then((res) => res.json())
  .then(json => {
    setError(false)
    setWeather(json)
  })
  .catch(err => {
    setError(true)
  })
}

function Locations(props: LocationProps) {
  const  {location, traffic} = props;
  const [selectedImg, setSelectedImg] = React.useState<SelectedImg | null>(null);
  const [weather, setWeather] = React.useState<WeatherProps | null>(null);
  const [error, setError] = React.useState<boolean>(false);

  return (
    <div>
      <ul>
        {
          location.map((val, index) => {
            return (
              <li key={index}>
                <Button variant="text" onClick={() => {
                  handleSetImage(index, traffic[index].imgUrl, setSelectedImg);
                  getWeather(traffic[index].lat, traffic[index].lon, setWeather, setError)
                }}>{val}</Button>
              </li>
            )
          })
        }
      </ul>
      <div className='image-weather'>
        { 
          selectedImg ? <img src={`${selectedImg && selectedImg.url}`}  width='300' height='240'/>
          : <div>No image selected</div> 
        }
        {
          selectedImg && 
          <div className='weather'>
            <h2>Area - {weather?.area}</h2>
            <div>Weather - {weather?.forecast}</div>
          </div>
        }
        {error && <div>Something went wrong</div>}
      </div>
    </div>
  );
}

export default Locations;