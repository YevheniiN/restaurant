import { screen } from '@testing-library/react';
import App from './App';
import renderComponent from "./utils/renderComponent";

test('should be render App without error', () => {
  renderComponent(<App/>);
  const titleElement = screen.getByText('Little Lemon');
  expect(titleElement).toBeInTheDocument();
});
