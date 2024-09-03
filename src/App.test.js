import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the EquipamentoEditModal component
jest.mock('./components/EquipamentoEditModal', () => {
  return function DummyEquipamentoEditModal() {
    return <div data-testid="mocked-equipamento-edit-modal" />;
  };
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// If the above test is still causing issues, you can skip it like this:
test.skip('renders learn react link', () => {
  // Test code here
});