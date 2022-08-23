import { render } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  const component = render(<App />);
  expect(component.container.querySelector('.landing-wrapper')).toBeInTheDocument();
});
