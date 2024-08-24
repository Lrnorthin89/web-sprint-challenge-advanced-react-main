// import server from './backend/mock-server'
import React from 'react'
import AppFunctional from './frontend/components/AppFunctional'
// ❗ class component is optional, uncomment next line to test
// import AppClass from './frontend/components/AppClass'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

jest.setTimeout(1000) // Optional: Adjust timeout for tests if needed

// Utility function to set up the component for testing
const setup = () => {
  render(<AppFunctional />);
  const upButton = screen.getByText(/up/i);
  const downButton = screen.getByText(/down/i);
  const leftButton = screen.getByText(/left/i);
  const rightButton = screen.getByText(/right/i);
  const resetButton = screen.getByText(/reset/i);
  const submitButton = screen.getByText(/submit/i);
  const emailInput = screen.getByLabelText(/email/i);
  const coordinates = screen.getByTestId('coordinates');
  const steps = screen.getByTestId('steps');
  const message = screen.getByTestId('message');
  return {
    upButton,
    downButton,
    leftButton,
    rightButton,
    resetButton,
    submitButton,
    emailInput,
    coordinates,
    steps,
    message,
  };
};

// Sample test case: Check initial state
test('AppFunctional renders with initial state', () => {
  const { coordinates, steps, message } = setup();
  expect(coordinates).toHaveTextContent('(2, 2)');
  expect(steps).toHaveTextContent('You moved 0 times');
  expect(message).toBeEmptyDOMElement();
});

// Sample test case: Moving up
test('moves up when up button is clicked', () => {
  const { upButton, coordinates, steps } = setup();
  fireEvent.click(upButton);
  expect(coordinates).toHaveTextContent('(2, 1)');
  expect(steps).toHaveTextContent('You moved 1 time');
});

// Sample test case: Resetting the game
test('reset button resets the game state', () => {
  const { upButton, resetButton, coordinates, steps, message } = setup();
  fireEvent.click(upButton);
  fireEvent.click(resetButton);
  expect(coordinates).toHaveTextContent('(2, 2)');
  expect(steps).toHaveTextContent('You moved 0 times');
  expect(message).toBeEmptyDOMElement();
});

// Sample test case: Submitting with valid email
test('displays success message on valid email submit', async () => {
  const { upButton, emailInput, submitButton } = setup();
  fireEvent.click(upButton);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.click(submitButton);
  expect(await screen.findByText('test win #31')).toBeInTheDocument();
});

// Sample test case: Submitting without email
test('displays error message when no email is submitted', async () => {
  const { submitButton } = setup();
  fireEvent.click(submitButton);
  expect(await screen.findByText('Ouch: email is required')).toBeInTheDocument();
});
