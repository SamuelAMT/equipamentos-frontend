import '@testing-library/jest-dom';

// Mock react-datepicker
jest.mock('react-datepicker', () => {
  const React = require('react');
  const DatePicker = React.forwardRef((props, ref) => (
    <input type="text" ref={ref} {...props} />
  ));
  return { __esModule: true, default: DatePicker };
});

// Mock axios
jest.mock('axios', () => ({
  default: {
    create: jest.fn(() => ({
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    })),
  },
}));

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));