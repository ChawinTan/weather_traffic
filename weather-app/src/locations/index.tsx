import React from 'react';
import Button from '@mui/material/Button';

import './index.css'

interface LocationProps {
  location: Array<string>;
  traffic: Array<any>;
}

interface SelectedImg {
  url: string;
  index: number;
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

function Locations(props: LocationProps) {
  const  {location, traffic} = props;
  const [selectedImg, setSelectedImg] = React.useState<SelectedImg | null>(null);

  return (
    <div>
      <ul>
        {
          location.map((val, index) => {
            return (
              <li key={index}>
                <Button variant="text" onClick={() => {
                  handleSetImage(index, traffic[index].imgUrl, setSelectedImg)
                }}>{val}</Button>
              </li>
            )
          })
        }
      </ul>
      <div className='image'>
        { 
          selectedImg ? <img src={`${selectedImg && selectedImg.url}`}  width='300' height='240'/>
          : <div>No image selected</div> 
        }
      </div>
    </div>
  );
}

export default Locations;