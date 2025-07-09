import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow,  TablePagination,
    Box,
} from '@mui/material';
import { ColumnConfig } from '@/types/table';
import LoaderSkeleton from './LoaderSkeleton';

interface CustomTableProps<T> {
    columns: ColumnConfig<T>[];
    rows: T[];
    page: number;
    totalCount: number;
    onChangePage: (newPage: number) => void;
}

function CustomTable<T extends { id: string | number }>({
    columns,
    rows,
    page,
    totalCount,
    onChangePage,
}: CustomTableProps<T>) {
    return (
        <Box>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="listing table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id.toString()} align={column.align || 'left'}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length ? rows.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.id.toString()} align={column.align || 'left'}>
                                        {column.render ? column.render(row) : (row[column.id as keyof T] as React.ReactNode)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )) : <TableRow >
                            <TableCell align={'left'} colSpan={4}>
                                <LoaderSkeleton />
                            </TableCell>
                        </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={(_, newPage) => onChangePage(newPage)}
                rowsPerPage={5}
                rowsPerPageOptions={[]}
            />
        </Box>
    );
}

export default CustomTable;
