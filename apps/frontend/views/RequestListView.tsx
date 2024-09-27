import { useState, useEffect } from 'react';
import RequestCard from '../components/RequestCard/RequestCard';
import Pagination from '../components/Pagination/Pagination';
import { Request, RequestListViewProps } from '../types/RequestListTypes';

const ITEMS_PER_PAGE = 10;

const RequestListView = ({ name }: RequestListViewProps) => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3001/api/legal-requests/list/${name}?page=${page}&limit=${ITEMS_PER_PAGE}`);
                const data = await res.json();

                if (res.ok) {
                    setRequests(data.data);
                    setTotalPages(data.totalPages);
                    setError(null);
                } else if(res.status === 404) {
                    setError('No requests found for this user');
                } else {
                    setError('Failed to load requests');
                }
            } catch (e) {
                setError('An error occurred while fetching the data');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [page]);

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (requests.length === 0) return <p>No requests</p>;

    return (
        <div>
            <h1>Request List</h1>
            {requests.map((request) => (
                <RequestCard key={request.id} headline={request.title} date={request.createdAt} user={request.author} />
            ))}
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onNext={handleNextPage}
                onPrevious={handlePreviousPage}
            />
        </div>
    );
};

export default RequestListView;
