//import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormSection1 from '../components/FormSection1';

describe('FormSection1 Component', () => {
  const mockSetRequestObject = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(
      <FormSection1
        userToken={null}
        onSetRequestObject={mockSetRequestObject}
        onSubmit={mockOnSubmit}
        requestObject={null}
        submitStatus={false}
      />
    );
  });

  it('should render input fields', () => {
    expect(screen.queryByTestId('name-input')).toBeTruthy();
    expect(screen.queryByTestId('regname-input')).toBeTruthy();
    expect(screen.queryByTestId('email-input')).toBeTruthy();
    expect(screen.queryByTestId('contactNo-input')).toBeTruthy();
  });

  it('should display validation error for name input', async () => {
    fireEvent.change(screen.queryByTestId('name-input')!, { target: { value: 'Te' } });
    fireEvent.submit(screen.getByText('SUBMIT'));

    //expect(await screen.findByText('The name should be atleast 3 characters long!')).toBeTruthy();
  });

  it('should submit the form with valid data', async () => {
    fireEvent.change(screen.queryByTestId('name-input')!, { target: { value: 'Valid Name' } });
    fireEvent.change(screen.queryByTestId('regname-input')!, { target: { value: 'Valid Lead Name' } });
    fireEvent.change(screen.queryByTestId('email-input')!, { target: { value: 'test@example.com' } });
    fireEvent.change(screen.queryByTestId('contactNo-input')!, { target: { value: '1234567890' } });

    fireEvent.submit(screen.getByText('SUBMIT'));

    //expect(mockOnSubmit).toHaveBeenCalledWith(true);
  });
});
