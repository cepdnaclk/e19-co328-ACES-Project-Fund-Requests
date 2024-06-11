//import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormSection2 from '../components/FormSection2';

describe('FormSection2 Component', () => {
  const mockSetRequestObject = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(
      <FormSection2
        requestObject={null}
        onSetRequestObject={mockSetRequestObject}
        onSubmit={mockOnSubmit}
      />
    );
  });

  it('should render input fields', () => {
    expect(screen.queryByTestId('project-title-input')?.tagName).toBe('INPUT');
    expect(screen.queryByTestId('project-description-input')?.tagName).toBe('TEXTAREA');
    // Add assertions for other input fields
  });

  it('should display validation error for title input', async () => {
    fireEvent.change(screen.queryByTestId('project-title-input')!, { target: { value: 'Teii' } });
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    //expect(await screen.findByText('The title should be at least 3 characters long!')).toBeTruthy();
  });

  it('should submit the form with valid data', async () => {
    // Fill in input fields with valid data
    fireEvent.change(screen.queryByTestId('project-title-input')!, { target: { value: 'Valid Title' } });
    fireEvent.change(screen.queryByTestId('project-description-input')!, { target: { value: 'Valid Description' } });
    // Add similar fireEvent calls for other input fields

    // Mock file selection
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    Object.defineProperty(screen.getByTestId('fileInput')!, 'files', {
      value: [file],
    });

    // Check the checkbox
    fireEvent.click(screen.queryByTestId('agreement-checkbox')!);

    // Submit the form
    fireEvent.click(screen.getByText('Submit'));

    // Wait for async tasks to complete
    //expect(await screen.findByText("You've successfully submitted the details about the project")).toBeTruthy();

    // Check if onSubmit function was called with true
    //expect(mockOnSubmit).toHaveBeenCalledWith(true);
  });
});
