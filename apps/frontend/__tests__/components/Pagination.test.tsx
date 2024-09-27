import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../components/Pagination/Pagination';

describe('Pagination Component', () => {
    const onNext = jest.fn();
    const onPrevious = jest.fn();

    test('renders correctly with current page and total pages', () => {
        render(<Pagination currentPage={1} totalPages={5} onNext={onNext} onPrevious={onPrevious} />);

        expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
        expect(screen.getByRole('button', { name: /next/i })).toBeEnabled();
    });

    test('calls onPrevious when previous button is clicked', () => {
        render(<Pagination currentPage={2} totalPages={5} onNext={onNext} onPrevious={onPrevious} />);

        fireEvent.click(screen.getByRole('button', { name: /previous/i }));
        expect(onPrevious).toHaveBeenCalled();
    });

    test('calls onNext when next button is clicked', () => {
        render(<Pagination currentPage={2} totalPages={5} onNext={onNext} onPrevious={onPrevious} />);

        fireEvent.click(screen.getByRole('button', { name: /next/i }));
        expect(onNext).toHaveBeenCalled();
    });

    test('disables next button on the last page', () => {
        render(<Pagination currentPage={5} totalPages={5} onNext={onNext} onPrevious={onPrevious} />);

        expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });
});
