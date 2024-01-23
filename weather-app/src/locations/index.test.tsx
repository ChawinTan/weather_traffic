import React from 'react';
import { fireEvent, render, screen, waitFor  } from '@testing-library/react';
import Locations from '.';
import fetch from 'jest-fetch-mock'
const locations = ['area'];
const traffic = [{  lat: '1.11',lon: '2.11', imgUrl: 'http://google.com'}];


test('should render properly', async () => {
  render(<Locations traffic={traffic} location={locations} />);
  expect(screen.getByText('area')).toBeInTheDocument()
});

test('should show weather when click', async () => {
  fetch.mockImplementation(() => Promise.resolve({ json: () => ({area: 'area', forecast: 'forecast'}) }) as any)
  render(<Locations traffic={traffic} location={locations} />);

  expect(screen.getByText('area')).toBeInTheDocument()

  const getAreaButton = screen.getByText('area');
  fireEvent.click(getAreaButton);

  await waitFor(() => {
    expect(screen.getByText('Area - area')).toBeInTheDocument();
  })
})

