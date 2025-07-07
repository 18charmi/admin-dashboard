import CustomTable from '@/components/CustomTable';
import { columns, rows } from './helper';

export default function Dashboard() {
    return (
        <CustomTable rows={rows} columns={columns} />
    );
}