import { notFound } from 'next/navigation';
import { fetchDetail } from './action';
import ContentForm from './ContentForm';

interface PageProps {
    params: Promise<{ id: string }>
}
export default async function Page({
    params,
}:
    PageProps) {
    const { id } = await params;
    const res = await fetchDetail(id);

    if (!res.success) {
        notFound();
    }
    return <ContentForm detail={res.data!} />

}