import { render } from '@testing-library/react';
import {SignOutPage} from '../SignOutPage';


  test('renders', () => {
    const { container } = render(<SignOutPage/>);
    expect(container.textContent)
      .toMatch('SIGN OUT');
  });

  test('sign out button is present', () => {
    const { getByTestId } = render(<SignOutPage/>);
    const element = getByTestId('signout-button');
    expect(element).toBeInTheDocument();
  });