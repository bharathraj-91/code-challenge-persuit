import { render, screen } from '@testing-library/react';
import RequestCard from '../../components/RequestCard/RequestCard';

describe('RequestCard Component', () => {
    const headline = 'Employment Law Advisory and Litigation Support Services';
    const date = 1697150712;
    const author = 'Jennifer Lopez';

    test('renders headline correctly', () => {
        render(<RequestCard headline={headline} date={date} user={author} />);

        expect(screen.getByText(headline)).toBeInTheDocument();
    });

    test('renders formatted date correctly', () => {
        render(<RequestCard headline={headline} date={date} user={author} />);

        const expectedDate = new Date(date * 1000).toLocaleDateString();
        expect(screen.getByText(`Date: ${expectedDate}`)).toBeInTheDocument();
    });

    test('renders author correctly', () => {
        render(<RequestCard headline={headline} date={date} user={author} />);

        expect(screen.getByText(`Submitted by: ${author}`)).toBeInTheDocument();
    });
});
