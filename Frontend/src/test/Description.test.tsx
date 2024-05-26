
// Import render function from @testing-library/react torender components in tests
import { render } from '@testing-library/react';

// Import Jest DOM matchers from @testing-library/jest-dom to extend Jest's capabilities for DOM testing
//import '@testing-library/jest-dom/extend-expect';

// Import the Description component to be tested
import Description from '../components/Description';

// Begin describing the test suite for the Description component
describe('Description component', () => {

    // Test case to check if the project fund description is rendered correctly
    test('renders project fund description', () => {

        // Render the Description component and retrieve query functions from @testing-library/react
        const { getByText } = render(<Description />);

        // Search for the project fund heading text within the rendered component
        const projectFundHeading = getByText('ACES Project Fund');

        // Search for the project fund text using a regular expression pattern within the rendered component
        const projectFundText = getByText(/The project fund is set up by ACES with the help of donations from ACES Alumni/i);

        // Assert that the project fund heading and text are both present in the rendered component
        expect(projectFundHeading).toBeTruthy();
        expect(projectFundText).toBeTruthy();
    });

    // Test case to check if the application form description is rendered correctly
    test('renderes application form description', () => {

        // Render the Description component and retrieve query function from @testing-library/react
        const { getByText } = render(<Description />);

        // Search for the application form heading text within the rendered component
        const applicationFormHeading = getByText('Application Form');

        // Assert that the application form heading is present in the rendered component
        expect(applicationFormHeading).toBeTruthy();
    });

    // Test case to compare the rendered output of the component with a stored snapshot
    test('matches snapshot', () => {

        // Render the Description component and retrieve the container element from @testing-library/react
        const { container } = render(<Description />);

        // Assert that the rendered output matches the stored snapshot
        expect(container).toMatchSnapshot();
    });
});