import { render, screen, waitFor } from '@testing-library/react';
import RequestListView from '../../views/RequestListView';

jest.mock('../../components/RequestCard/RequestCard', () => () => <div>RequestCard</div>);
jest.mock('../../components/Pagination/Pagination', () => () => <div>Pagination</div>);

describe('RequestListView Component', () => {
    const name = 'Abc';

    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    data: [
                        {
                            "id": "106aaa8c-79c1-4426-b77d-a7dbe33bd7cb",
                            "title": "Environmental Law Advisory and Representation Services",
                            "author": "Linda Rodriguez",
                            "createdAt": 1719783700,
                            "published": false,
                            "auction": false
                        },
                        {
                            "id": "7a51a54f-84e1-43d3-a5f0-2a459ab3c9a2",
                            "title": "Legal Consultancy for Public-Private Partnership Agreements",
                            "author": "Linda Rodriguez",
                            "createdAt": 1710478394,
                            "published": false,
                            "auction": true
                        },
                        {
                            "id": "605e4f25-d498-4a42-a2d1-5cb49a17696e",
                            "title": "Intellectual Property Management and Litigation Support",
                            "author": "Linda Rodriguez",
                            "createdAt": 1710593530,
                            "published": false,
                            "auction": true
                        },
                    ],
                    totalPages: 2,
                }),
            })
        ) as jest.Mock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', () => {
        render(<RequestListView name={name} />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders requests after fetch', async () => {
        render(<RequestListView name={name} />);

        await waitFor(() => {
            expect(screen.getByText('Request List')).toBeInTheDocument();

            const requestCards = screen.getAllByText('RequestCard');
            expect(requestCards.length).toBe(3);
            expect(screen.getByText('Pagination')).toBeInTheDocument();
        });
    });

    test('renders error message on fetch failure', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 500,
                json: () => Promise.resolve({}),
            })
        ) as jest.Mock;

        render(<RequestListView name={name} />);

        await waitFor(() => expect(screen.getByText('Error: Failed to load requests')).toBeInTheDocument());
    });

    test('renders no requests when there are none', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    data: [],
                    totalPages: 1,
                }),
            })
        ) as jest.Mock;

        render(<RequestListView name={name} />);

        await waitFor(() => expect(screen.getByText('No requests')).toBeInTheDocument());
    });

    test('renders error message on 404', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 404,
                json: () => Promise.resolve({}),
            })
        ) as jest.Mock;

        render(<RequestListView name={name} />);

        await waitFor(() => expect(screen.getByText('Error: No requests found for this user')).toBeInTheDocument());
    });
});
