import { render } from '@testing-library/react';
import {SignInPage} from '../SignInPage';


  test('renders', () => {
    const { container } = render(<SignInPage/>);
    expect(container.textContent)
      .toMatch('Please sign in with google');
  });

  test('sign in  button is present', () => {
    const { getByTestId } = render(<SignInPage/>);
    const element = getByTestId('click-button');
    expect(element).toBeInTheDocument();
  });