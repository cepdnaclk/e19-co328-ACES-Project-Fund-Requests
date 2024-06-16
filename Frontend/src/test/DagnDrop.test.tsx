//import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DragDrop from '../components/DragnDrop';

describe('DragDrop Component', () => {
  it('should call handleChange function when a file is uploaded', () => {
    const { container } = render(<DragDrop />);
    const fileInput = container.querySelector('input[type="file"]');
    
    // Ensure fileInput is not null
    if (fileInput !== null) {
      // Simulate file upload
      fireEvent.change(fileInput, {
        target: { files: [new File(['dummy content'], 'test.pdf', { type: 'application/pdf' })] }
      });

      // Assert that handleChange function is called
      // Add your assertions here based on the behavior of handleChange
    } else {
      // Handle the case where fileInput is null
      throw new Error('File input element not found');
    }
  });
});
