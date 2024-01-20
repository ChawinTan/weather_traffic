import React, { Dispatch, SetStateAction } from 'react';
interface LocationProps {
  location: Array<string>;
  traffic: Array<any>;
  setLocation: Dispatch<SetStateAction<Array<string>>>;
  setTraffic: Dispatch<SetStateAction< Array<any>>>;
}

const getLocations = async (trafficData: any, locationList:any, setLocation: any) => {
  for (let i=0; i < trafficData.length; i++) {
    const response = await fetch('http://localhost:3001/location')
    const json = await response.text()
    locationList.push(json)
  }
  setLocation(locationList)
}

function Locations(props: LocationProps) {
  const {setLocation, setTraffic} = props;
  const locationList: any = [];
  React.useEffect(() => {
    fetch('http://localhost:3001/traffic')
    .then(res => res.json())
    .then((json: any) => {
      setTraffic(json)
      return getLocations(json, locationList, setLocation)
    })
  }, [])

  return (
    <div>
      locations
    </div>
  );
}

export default Locations;