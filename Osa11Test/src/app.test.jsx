import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Tämä tuo tarvittavat matcherit suoraan
import App from './App';

test('renders App component', () => {
  render(<App />);
  const head = screen.getByText('My Todolist');
  expect(head).toBeInTheDocument();
});

test('add & clear todo', () => {
  render(<App />);

  // Täytetään lomakekentät
  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, { target: { value: 'Go to coffee' } });

  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, { target: { value: '29.12.2023' } });

  const status = screen.getByPlaceholderText('Status');
  fireEvent.change(status, { target: { value: 'Open' } });

  const button = screen.getByText('Add');
  fireEvent.click(button);

  // Tarkistetaan, että taulukossa näkyy lisätty tehtävä
  const table = screen.getByRole('table');
  expect(table).toHaveTextContent(/Go to coffee/i); // Matchaa tekstin case-insensitiivisesti

  // Klikataan "Clear" ja tarkistetaan, että taulukko on tyhjä
  const clearButton = screen.getByText('Clear');
  fireEvent.click(clearButton);

  // Varmistetaan, että taulukossa ei enää ole kyseistä tehtävää
  expect(table).not.toHaveTextContent(/Go to coffee/i);
});
