import CustomTable from '@/components/CustomTable';
import { columns, rows } from './helper';
import { fetchVehicleList } from './action';
import { notFound } from 'next/navigation';

export default async function Dashboard() {
    const res = await fetchVehicleList();

    if (!res.success) {
        notFound();
    }

    return (
        <CustomTable rows={rows} columns={columns} />
    );
}