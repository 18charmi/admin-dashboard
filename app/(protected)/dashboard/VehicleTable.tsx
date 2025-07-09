"use client"
import CustomTable from '@/components/CustomTable';
import usePagination from '@/hook/usePagination';
import { Vehicle } from '@/types/list';
import { ColumnConfig } from '@/types/table';
import { PAGES } from '@/utils/constant';
import { useRouter } from 'next/navigation';
import React from 'react';
import EditAction from './EditAction';

type VehicleTableProps = {
    list?: Vehicle[],
    total?: number
    currentPage: number
}
const VehicleTable = ({ list = [], total = 0, currentPage }: VehicleTableProps) => {
    const router = useRouter();

    const {
        page,
        handleChangePage,
    } = usePagination({ initialPage: currentPage - 1 });


    const columns: ColumnConfig<Vehicle>[] = [
        { id: 'id', label: 'Id' },
        { id: 'title', label: 'Title' },
        { id: 'status', label: 'Status' },
        {
            id: 'actions',
            label: 'Actions',
            align: 'right',
            render: (row) => (
                <EditAction detail={row} />
            ),
        },
    ];

    return <CustomTable
        rows={list}
        columns={columns}
        page={page}
        totalCount={total}
        onChangePage={(page) => {
            router.push(`/${PAGES.DASHBOARD}?page=${page + 1}`)
            handleChangePage(page)
        }}
    />;
};

export default VehicleTable;
