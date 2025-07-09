'use server';
import { LIST_LIMIT } from '@/utils/constant';

export async function fetchVehicleList(limit = LIST_LIMIT, skip = 0) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/vehicle?limit=${limit}&skip=${skip}`, {
        method: 'GET',
    })
    const data = await response.json()
    return data;
}
