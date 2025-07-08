import { fetchVehicleList } from './action';
import { notFound } from 'next/navigation';
import VehicleTable from './VehicleTable';
import { LIST_LIMIT } from '@/utils/constant';

interface PageProps {
    searchParams: Promise<{ 'page': string | string[] | undefined }>
}

export default async function Dashboard({ searchParams }: PageProps) {
    const pageParam = typeof (await searchParams).page === "string" ? (await searchParams).page as string : null;
    const currentPage = parseInt(pageParam || '1', 10);
    const skip = (currentPage - 1) * LIST_LIMIT;

    const res = await fetchVehicleList(LIST_LIMIT, skip);

    if (!res.success) {
        notFound();
    }

    return (
        <VehicleTable list={res.data?.products} total={res.data?.total} currentPage={currentPage} />
    );
}