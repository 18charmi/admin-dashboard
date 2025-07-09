import { useState } from 'react';

interface UsePaginationProps {
    initialPage?: number;
}

const usePagination = ({ initialPage = 0 }: UsePaginationProps = {}) => {
    const [page, setPage] = useState(initialPage);

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    return {
        page,
        handleChangePage,
    };
};

export default usePagination;
