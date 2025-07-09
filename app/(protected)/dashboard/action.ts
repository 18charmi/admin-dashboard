'use server';
import { ContentFormReq, Vehicle } from '@/types/list';
import { LIST_LIMIT } from '@/utils/constant';
import { revalidatePath } from 'next/cache';

export async function fetchVehicleList(limit = LIST_LIMIT, skip = 0) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/vehicle?limit=${limit}&skip=${skip}`, {
        method: 'GET',
    })
    const data = await response.json()
    return data;
}
export async function revalidateDashboard(path: string) {
    revalidatePath(path);
}


export async function updateDetail(data: ContentFormReq, id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/vehicle`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, id }),
    })
    return await response.json();
}

export async function updateStatus(data: Pick<Vehicle, 'status' | 'id'>) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/vehicle`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return await response.json();
}
