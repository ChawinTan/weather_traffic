import React from 'react';
import { render, screen  } from '@testing-library/react';
import App from './App';

test('should render properly', () => {
  render(<App />);
  const getTrafficImgButton = screen.getByText('Get Traffic Images');
  expect(getTrafficImgButton).toBeInTheDocument();
  expect(getTrafficImgButton).toBeDisabled();
});

