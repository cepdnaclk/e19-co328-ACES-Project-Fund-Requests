import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import FooterSection from '../components/FooterSection'; // Adjust the import path as necessary

describe('FooterSection Component', () => {
  it('renders the footer with the correct background color', () => {
    render(<FooterSection />);
    const footerElement = screen.getByTestId('footer-section');
    expect(footerElement).toHaveStyle('background-color: #051B26');
  });

  it('displays the department name', () => {
    render(<FooterSection />);
    const departmentText = screen.getByText(/Department of Computer Engineering - University of Peradeniya/i);
    expect(departmentText).toBeTruthy();
  });

  it('displays the last build date', () => {
    render(<FooterSection />);
    const buildDateText = screen.getByText(/Last Build: 13\/06\/2024/i);
    expect(buildDateText).toBeTruthy();
  });
});
