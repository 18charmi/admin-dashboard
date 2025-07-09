'use server';
import { ContentFormReq, Vehicle } from '@/types/list';
import { cookies } from 'next/headers';

export async function fetchDetail(id: string) {

        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/vehicle?id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${(await cookies()).get('session')}`,
                'Content-Type': 'application/json',
            },
        })
        return await response.json();
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
