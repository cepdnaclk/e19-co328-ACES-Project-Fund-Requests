import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import DeniedSection from '../components/DeniedSection';
import { DUserTokenInterface } from '../models/TokenMoodel';
//import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockUserToken: DUserTokenInterface = {
  email: 'test@example.com',
  family_name: 'Doe',
  given_name: 'John',
  hd: 'example.com',
  name: 'John Doe',
  picture: 'http://example.com/picture.jpg',
};

describe('DeniedSection Component', () => {
  test('renders the component with correct text and image', () => {
    render(<DeniedSection userToken={mockUserToken} />);
    
    expect(screen.queryByText(/We're sorry, but you don't meet the requirements for the voucher at this time/i)).not.toBeNull();
    expect(screen.queryByText(/Good Luck with your Project/i)).not.toBeNull();
    expect(screen.getByRole('img')).not.toBeNull();
  });

  test('calls axios on link click', async () => {
    mockedAxios.get.mockResolvedValue({ status: 200 });

    render(<DeniedSection userToken={mockUserToken} />);

    const link = screen.getByText(/Re-Apply/i);
    fireEvent.click(link);

    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5000/delete/test@example.com');
    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for promise to resolve

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  test('link click logs correct messages based on axios response', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    mockedAxios.get.mockResolvedValue({ status: 200 });

    render(<DeniedSection userToken={mockUserToken} />);

    fireEvent.click(screen.getByText(/Re-Apply/i));
    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for promise to resolve

    expect(consoleSpy).toHaveBeenCalledWith("Link clicked");
    expect(consoleSpy).toHaveBeenCalledWith("Delete success");

    consoleSpy.mockRestore();
  });
});
