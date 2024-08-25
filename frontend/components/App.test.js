import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppFunctional from './AppFunctional';

test('sanity', () => { 
  expect(true).toBe(true);
});

test('renders the heading correctly', () => {
  const { getByText } = render(<AppFunctional />);
  const heading = getByText(/coordinates/i); // Assuming the heading contains the word "Coordinates"
  expect(heading).toBeInTheDocument();
});

test('renders all the buttons', () => {
  const { getByText } = render(<AppFunctional />);

  // Checking if each button is rendered by looking for their text labels
  const upButton = getByText(/up/i);
  const downButton = getByText(/down/i);
  const leftButton = getByText(/left/i);
  const rightButton = getByText(/right/i);
  const resetButton = getByText(/reset/i);
  const submitButton = getByText(/submit/i);

  // Ensuring all buttons are present in the document
  expect(upButton).toBeInTheDocument();
  expect(downButton).toBeInTheDocument();
  expect(leftButton).toBeInTheDocument();
  expect(rightButton).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('input value changes on typing', () => {
  const { getByLabelText } = render(<AppFunctional />);
  const input = getByLabelText(/email/i); // Assuming the input is labeled with "Email"
  
  // Simulate typing into the input field
  fireEvent.change(input, { target: { value: 'test@example.com' } });
  
  // Assert that the input's value has been updated
  expect(input.value).toBe('test@example.com');
});

test('displays the initial coordinates correctly', () => {
  const { getByText } = render(<AppFunctional />);
  const coordinates = getByText(/\(2, 2\)/i);
  expect(coordinates).toBeInTheDocument();
});

test('resets the game state when the reset button is clicked', () => {
  const { getByText, getByLabelText } = render(<AppFunctional />);
  const resetButton = getByText(/reset/i);
  const input = getByLabelText(/email/i);
  
  fireEvent.click(resetButton);
  expect(input.value).toBe('');
  const coordinates = getByText(/\(2, 2\)/i);
  expect(coordinates).toBeInTheDocument();
});