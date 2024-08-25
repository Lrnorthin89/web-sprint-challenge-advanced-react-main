import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppFunctional from './AppFunctional';

test('sanity', () => { 
  expect(true).toBe(true);
});

test('renders the heading correctly', () => {
  const { getByText } = render(<AppFunctional />);
  const heading = getByText(/coordinates/i);
  expect(heading).toBeInTheDocument();
});

test('renders all the buttons and inputs', () => {
  const { getByText, container } = render(<AppFunctional />);

  const upButton = getByText(/up/i);
  const downButton = getByText(/down/i);
  const leftButton = getByText(/left/i);
  const rightButton = getByText(/right/i);
  const resetButton = getByText(/reset/i);
  const submitButton = container.querySelector('#submit');
  const emailInput = getByText(/email/i);

  expect(upButton).toBeInTheDocument();
  expect(downButton).toBeInTheDocument();
  expect(leftButton).toBeInTheDocument();
  expect(rightButton).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test('displays the initial message element correctly', () => {
  const { container } = render(<AppFunctional />);
  
  const messageElement = container.querySelector('#message');
  expect(messageElement).toBeInTheDocument();
});

// Other tests follow...

