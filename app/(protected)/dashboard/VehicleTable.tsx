"use client"
import CustomButton from '@/components/CustomButton';
import CustomTable from '@/components/CustomTable';
import usePagination from '@/hook/usePagination';
import { Vehicle } from '@/types/list';
import { ColumnConfig } from '@/types/table';
import { PAGES } from '@/utils/constant';
import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type VehicleTableProps = {
    list?: Vehicle[],
    total?: number
    currentPage: number
}
const VehicleTable = ({ list = [], total = 0, currentPage }: VehicleTableProps) => {
    const [rows, setRows] = useState<Vehicle[]>([]);
    const router = useRouter();

    const {
        page,
        totalCount,
        setTotalCount,
        handleChangePage,
    } = usePagination();

    useEffect(() => {
        if (page !== currentPage - 1) {
            router.push(`/${PAGES.DASHBOARD}?page=${page + 1}`)
            setRows([])
        }
    }, [page]);

    useEffect(() => {
        setTotalCount(total);
    }, [total])

    useEffect(() => {
        setRows(list)
        console.log(list);
    }, [list]);

    const handleAction = (id: number, action: 'approve' | 'reject' | 'edit') => {
        console.log(`Row ${id} -> ${action}`);
        setRows(prev =>
            prev.map(row =>
                row.id === id
                    ? {
                        ...row,
                        status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : row.status,
                    }
                    : row
            )
        );
    };


    const columns: ColumnConfig<Vehicle>[] = [
        { id: 'id', label: 'Id' },
        { id: 'title', label: 'Title' },
        { id: 'status', label: 'Status' },
        {
            id: 'actions',
            label: 'Actions',
            align: 'right',
            render: (row) => (
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <CustomButton size="small" color="success" onClick={() => handleAction(row.id, 'approve')}>Approve</CustomButton>
                    <CustomButton size="small" color="error" onClick={() => handleAction(row.id, 'reject')}>Reject</CustomButton>
                    <CustomButton size="small" variant="outlined" onClick={() => handleAction(row.id, 'edit')}>Edit</CustomButton>
                </Stack>
            ),
        },
    ];

    return <CustomTable
        rows={rows}
        columns={columns}
        page={page}
        totalCount={totalCount}
        onChangePage={handleChangePage}
    />;
};

export default VehicleTable;
