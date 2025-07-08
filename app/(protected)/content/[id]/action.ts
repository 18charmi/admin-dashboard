'use server';
import { ContentFormReq, Vehicle } from '@/types/list';
import { cookies } from 'next/headers';

export async function fetchDetail(id: string) {

    try {
        const response = await fetch(`${process.env.API_HOST}/products/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${(await cookies()).get('session')}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error status ${response.status}`);
        }
        const detail = await response.json() as Vehicle;
        return { success: true, data: detail };

    } catch (e) {

        console.log("Error fetchVehicleDetail : ", e);
        return { success: false, message: "failed to fetch vehicle detail" };

    }
}

export async function updateDetail(data: ContentFormReq, id: string) {

    try {
        const response = await fetch(`${process.env.API_HOST}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error(`HTTP error status ${response.status}`);
        }
        const detail = await response.json() as Vehicle;

        return { success: true, message: "updateDetail Success" };

    } catch (e) {

        console.log("Error updateDetail : ", e);
        return { success: false, message: "updateDetail" };

    }
}
