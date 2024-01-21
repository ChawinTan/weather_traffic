import React from 'react';
import Button from '@mui/material/Button';

interface LocationProps {
  location: Array<string>;
  traffic: Array<any>;
}


function Locations(props: LocationProps) {
  const  {location} = props;
  return (
    <div>
      <ul>
        {
          location.map((val, index) => {
            return (
              <li key={index}>
                <Button variant="text">{val}</Button>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default Locations;