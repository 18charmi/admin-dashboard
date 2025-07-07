import * as React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    DataGridProps,
    GridColDef,
    GridRowsProp,
} from '@mui/x-data-grid';

type CustomTableProps = {
    rows: GridRowsProp;
    columns: GridColDef[];
    height?: number;
    pageSize?: number;
    renderActions?: (row: any) => React.ReactNode;
} & Partial<DataGridProps>;

const CustomTable: React.FC<CustomTableProps> = ({
    rows,
    columns,
    height = 400,
    pageSize = 5,
    renderActions,
    checkboxSelection = true,
    disableRowSelectionOnClick = true,
    ...props
}) => {
    const actionColumn: GridColDef[] = renderActions
    ? [
        {
          field: 'actions',
          headerName: 'Actions',
          width: 250,
          sortable: false,
          filterable: false,
          disableColumnMenu: true,
          renderCell: (params) => renderActions(params.row),
        },
      ]
    : [];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={[...columns, ...actionColumn]}

                // initialState={{
                //     pagination: {
                //         paginationModel: {
                //             pageSize,
                //         },
                //     },
                // }}
                // pageSizeOptions={[pageSize]}
                // checkboxSelection={checkboxSelection}
                // disableRowSelectionOnClick={disableRowSelectionOnClick}
                // paginationMode="server"
                // sortingMode="server"
                // filterMode="server"
                {...props}
            />
        </Box>
    );
};

export default CustomTable;
