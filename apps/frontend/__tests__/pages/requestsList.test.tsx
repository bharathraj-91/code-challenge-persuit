import { render, screen } from '@testing-library/react';
import RequestListPage from '../../pages/requests-list/[name]';

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

jest.mock('../../views/RequestListView', () => {
    return jest.fn(() => <div>RequestListView</div>);
});

describe('RequestList Page', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: { name: 'Abc' },
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders RequestListView with name from router query', () => {
        render(<RequestListPage />);

        expect(screen.getByText('RequestListView')).toBeInTheDocument();
    });

    test('does not render RequestListView when name is undefined', () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: {},
        }));

        render(<RequestListPage />);

        expect(screen.queryByText('RequestListView')).toBeNull();
    });
});
