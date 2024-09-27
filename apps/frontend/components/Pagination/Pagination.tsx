import styles from './Pagination.module.css';
import { PaginationProps } from "../../types/PaginationTypes";


const Pagination = ({ currentPage, totalPages, onNext, onPrevious }: PaginationProps) => (
    <div className={styles.pagination}>
        <button
            className={styles.paginationButton}
            onClick={onPrevious}
            disabled={currentPage === 1}
        >
            Previous
        </button>
        <span className={styles.pageIndicator}>Page {currentPage} of {totalPages}</span>
        <button
            className={styles.paginationButton}
            onClick={onNext}
            disabled={currentPage === totalPages}
        >
            Next
        </button>
    </div>
);

export default Pagination;
