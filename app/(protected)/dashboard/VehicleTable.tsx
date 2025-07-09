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
import { updateStatus } from '../content/[id]/action';
import { useAlert } from '@/context/AlertContext';

type VehicleTableProps = {
    list?: Vehicle[],
    total?: number
    currentPage: number
}
const VehicleTable = ({ list = [], total = 0, currentPage }: VehicleTableProps) => {
    const [rows, setRows] = useState<Vehicle[]>([]);
    const router = useRouter();
    const { showAlert } = useAlert();
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
    }, [list]);

    const handleAction = async (id: number, action: 'approve' | 'reject' | 'edit') => {
        if (action === 'edit') {
            router.push(`/${PAGES.CONTENT}/${id}`);
        } else {

            const { success, message } = await updateStatus({
                status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'pending',
                id
            },
            );
            showAlert(message, success ? "success" : "error");

        }

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
                    {
                        row.status !== "pending" ? <></> :
                            <>
                                <CustomButton size="small" color="success" onClick={() => handleAction(row.id, 'approve')}>Approve</CustomButton>
                                <CustomButton size="small" color="error" onClick={() => handleAction(row.id, 'reject')}>Reject</CustomButton>
                            </>
                    }<CustomButton size="small" variant="outlined" onClick={() => handleAction(row.id, 'edit')}>Edit</CustomButton>
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
