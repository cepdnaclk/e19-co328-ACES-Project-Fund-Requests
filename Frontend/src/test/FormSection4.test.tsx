import { render, screen } from '@testing-library/react';
import FormSection4 from '../components/FormSection4';

describe('FormSection4 Component', () => {
  it('should render the correct content', () => {
    render(<FormSection4 />);
    const divElement = screen.queryByText('FormSection3');
    expect(divElement).not.toBeNull();
  });
});
