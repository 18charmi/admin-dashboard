import { GridColDef } from '@mui/x-data-grid';

export const rows = [
    { id: 1, name: 'Honda Civic', status: 'Pending' },
    { id: 2, name: 'Toyota Camry', status: 'Approved',  },
];

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Car Name', flex: 1 },
    { field: 'status', headerName: 'Status', width: 120 },
];
