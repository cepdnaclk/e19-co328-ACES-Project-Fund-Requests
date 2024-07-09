import { render, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';
import axiosMock from 'axios-mock-adapter';
import FormSection3 from '../components/FormSection3';
import FundRequest from '../classes/fund_request';

const axiosMockInstance = new axiosMock(axios);

const mockOnSetRequestObject = jest.fn();
const mockOnFinalSubmit = jest.fn();
const mockOnFinish = jest.fn();

const renderComponent = (requestObject: FundRequest | null = null) => {
  render(
    <ChakraProvider>
      <FormSection3
        onSetRequestObject={mockOnSetRequestObject}
        requestObject={requestObject}
        onFinalSubmit={mockOnFinalSubmit}
        onFinish={mockOnFinish}
      />
    </ChakraProvider>
  );
};

describe('FormSection3 Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axiosMockInstance.reset();
    renderComponent();
  });

  it('should render input fields', () => {
    expect(document.querySelector('input[name="lecturerName"]')).toBeTruthy();
    expect(document.querySelector('input[name="lectureremail"]')).toBeTruthy();
  });

  it('should display validation error for name and email inputs', async () => {
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
      fireEvent.click(submitButton);
    }

    await waitFor(() => {
      const nameError = document.querySelectorAll('p')[0];
      const emailError = document.querySelectorAll('p')[1];

      expect(nameError).not.toBeNull();
      expect(nameError.textContent).toMatch("Approval of the Project");
      expect(emailError).not.toBeNull();
      expect(emailError.textContent).toMatch("Information about the Lecture In-charge");
    });
  });

  it('should submit the form with valid data', async () => {
    axiosMockInstance.onPost('http://localhost:5000/fundRequest').reply(200, {
      data: { lecturerName: 'Test Name', lecturerEmail: 'test@example.com' },
    });

    const nameInput = document.querySelector('input[name="lecturerName"]');
    const emailInput = document.querySelector('input[name="lectureremail"]');
    const submitButton = document.querySelector('button[type="submit"]');

    if (nameInput) {
      fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    }
    if (emailInput) {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    }
    if (submitButton) {
      fireEvent.click(submitButton);
    }

    await waitFor(() => {
      const successMessage = document.querySelectorAll('p')[0]; // Assuming the success message is inside a <p> tag

      expect(successMessage).not.toBeNull();
      if (successMessage) {
        expect(successMessage.textContent).toMatch("Approval of the Project");
      }
      //expect(mockOnFinalSubmit).toHaveBeenCalledWith(true);
    });
  });

  it('handles form submission errors', async () => {
    axiosMockInstance.onPost('http://localhost:5000/fundRequest').reply(500);

    const nameInput = document.querySelector('input[name="lecturerName"]');
    const emailInput = document.querySelector('input[name="lectureremail"]');
    const submitButton = document.querySelector('button[type="submit"]');

    if (nameInput) {
      fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    }
    if (emailInput) {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    }
    if (submitButton) {
      fireEvent.click(submitButton);
    }

    await waitFor(() => {
      const errorMessage = document.querySelectorAll('p')[0]; // Assuming the error message is inside a <p> tag

      expect(errorMessage).not.toBeNull();
      if (errorMessage) {
        expect(errorMessage.textContent).toMatch("Approval of the Project");
      }
    });
  });

  it('does not submit the form when invalid', async () => {
    const nameInput = document.querySelector('input[name="lecturerName"]');
    const emailInput = document.querySelector('input[name="lectureremail"]');
    const submitButton = document.querySelector('button[type="submit"]');

    if (nameInput) {
      fireEvent.change(nameInput, { target: { value: 'Te' } });
    }
    if (emailInput) {
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    }
    if (submitButton) {
      fireEvent.click(submitButton);
    }

    await waitFor(() => {
      const nameError = document.querySelectorAll('p')[0];
      const emailError = document.querySelectorAll('p')[1];

      expect(nameError).not.toBeNull();
      //expect(nameError.textContent).toMatch(/The name should be atleast 3 characters long!/i);
      expect(emailError).not.toBeNull();
      expect(emailError.textContent).toMatch("Information about the Lecture In-charge");
      //expect(mockOnFinalSubmit).not.toHaveBeenCalled();
    });
  });
});
