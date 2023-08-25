import React from 'react'
import { render, screen } from '@testing-library/react';
import App from './App';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}


jest.mock('tone');

jest.mock('tone', () => ({
  Synth: jest.fn().mockImplementation(() => ({
    toDestination: jest.fn().mockReturnThis(),
  })),
  start: jest.fn(),
}));

test('renders the App correctly', () => {
  render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  // render(<App />);

  // Check for the logo image
  const logoElement = screen.getByAltText(/logo/i);
  expect(logoElement).toBeInTheDocument();

  // You can also check if MidiPlayer and Piano are being rendered
  // by looking for specific text or elements within those components.
  // For demonstration purposes, let's say MidiPlayer renders a button with text "Play MIDI":
  const midiButton = screen.getByText(/play midi/i);
  expect(midiButton).toBeInTheDocument();

  // And let's say Piano renders a button (or element) with text "C4" for the C4 key:
  // const c4Key = screen.getByText(/c4/i);
  // console.log(screen.getAllByAltText("c4"))
  const c4Key = screen.getByTestId("C4")
  expect(c4Key).toBeInTheDocument();
});
