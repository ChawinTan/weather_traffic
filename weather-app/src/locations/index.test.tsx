import React from 'react';
import { render, screen  } from '@testing-library/react';
import Locations from '.';

const locations = ['area'];
const traffic = [{  lat: '1.11',lon: '2.11', imgUrl: 'http://google.com'}];


test('should render properly', async () => {
  render(<Locations traffic={traffic} location={locations} />);
  expect(screen.getByText('area')).toBeInTheDocument()
});

