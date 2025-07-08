import { useState } from 'react';

interface UsePaginationProps {
    initialPage?: number;
}

const usePagination = ({ initialPage = 0 }: UsePaginationProps = {}) => {
    const [page, setPage] = useState(initialPage);
    const [totalCount, setTotalCount] = useState(0);

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    return {
        page,
        totalCount,
        setTotalCount,
        handleChangePage,
    };
};

export default usePagination;
