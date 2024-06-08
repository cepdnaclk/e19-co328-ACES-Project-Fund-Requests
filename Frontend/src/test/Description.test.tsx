

import { render, screen } from '@testing-library/react';
import Description from '../components/Description'; // Adjust the import path as necessary

describe('Description Component', () => {
  it('renders the ACES Project Fund text', () => {
    render(<Description />);
    const headingElement = screen.getByText(/ACES Project Fund/i);
    expect(headingElement).toBeTruthy();
  });

  it('renders the application form heading', () => {
    render(<Description />);
    const formHeadingElement = screen.getByText(/Application Form/i);
    expect(formHeadingElement).toBeTruthy();
  });

  it('renders the project fund description', () => {
    render(<Description />);
    const descriptionText = /The project fund is set up by ACES with the help of donations from ACES Alumni./i;
    const descriptionElement = screen.getByText(descriptionText);
    expect(descriptionElement).toBeTruthy();
  });
});

