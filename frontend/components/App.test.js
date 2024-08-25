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
  const { getByText } = render(<AppFunctional />);
  const input = getByText(/email/i); // Assuming the input is labeled with "Email"
  
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

test('displays the initial steps correctly', () => {
  const { getByText } = render(<AppFunctional />);
  const steps = getByText(/you moved 0 times/i);
  expect(steps).toBeInTheDocument();
});

test('displays the initial message correctly', () => {
  const { getByText } = render(<AppFunctional />);
  const message = getByText(/message/i);
  expect(message).toBeInTheDocument();
});

test('moves up when up button is clicked', () => {
  const { getByText } = render(<AppFunctional />);
  const upButton = getByText(/up/i);
  const coordinates = getByText(/\(2, 2\)/i);
  const steps = getByText(/you moved 0 times/i);

  // Click the "Up" button
  fireEvent.click(upButton);

  // Check if the coordinates have been updated
  expect(coordinates).toHaveTextContent('(2, 1)');

  // Check if the steps have been updated
  expect(steps).toHaveTextContent('You moved 1 time');
});

test('moves down when down button is clicked', () => {
  const { getByText } = render(<AppFunctional />);
  const downButton = getByText(/down/i);
  const coordinates = getByText(/\(2, 2\)/i);
  const steps = getByText(/you moved 0 times/i);

  // Click the "Down" button
  fireEvent.click(downButton);

  // Check if the coordinates have been updated
  expect(coordinates).toHaveTextContent('(2, 3)');

  // Check if the steps have been updated
  expect(steps).toHaveTextContent('You moved 1 time');
});

test('moves left when left button is clicked', () => {
  const { getByText } = render(<AppFunctional />);
  const leftButton = getByText(/left/i);
  const coordinates = getByText(/\(2, 2\)/i);
  const steps = getByText(/you moved 0 times/i);

  // Click the "Left" button
  fireEvent.click(leftButton);

  // Check if the coordinates have been updated
  expect(coordinates).toHaveTextContent('(1, 2)');

  // Check if the steps have been updated
  expect(steps).toHaveTextContent('You moved 1 time');
});

test('moves right when right button is clicked', () => {
  const { getByText } = render(<AppFunctional />);
  const rightButton = getByText(/right/i);
  const coordinates = getByText(/\(2, 2\)/i);
  const steps = getByText(/you moved 0 times/i);

  // Click the "Right" button
  fireEvent.click(rightButton);

  // Check if the coordinates have been updated
  expect(coordinates).toHaveTextContent('(3, 2)');

  // Check if the steps have been updated
  expect(steps).toHaveTextContent('You moved 1 time');
});

test('resets the game state when reset button is clicked', () => {
  const { getByText } = render(<AppFunctional />);
  const upButton = getByText(/up/i);
  const resetButton = getByText(/reset/i);
  const coordinates = getByText(/\(2, 2\)/i);
  const steps = getByText(/you moved 0 times/i);

  // Move up once
  fireEvent.click(upButton);

  // Click the "Reset" button
  fireEvent.click(resetButton);

  // Check if the coordinates have been reset
  expect(coordinates).toHaveTextContent('(2, 2)');

  // Check if the steps have been reset
  expect(steps).toHaveTextContent('You moved 0 times');
});
