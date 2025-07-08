'use server';
import { cookies } from 'next/headers';
import { VehicleList } from '@/types/list';
import { LIST_LIMIT } from '@/utils/constant';

export async function fetchVehicleList(limit = LIST_LIMIT, skip = 0) {

    try {
        const response = await fetch(`${process.env.API_HOST}/products?limit=${limit}&skip=${skip}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${(await cookies()).get('session')}`, 
                'Content-Type': 'application/json',
            },
        })
        
        if (!response.ok) {
            throw new Error(`HTTP error status ${response.status}`);
        }
        const detail = await response.json() as VehicleList;
        return { success: true, data: detail };

    } catch (e) {

        console.log("Error fetchVehicleList : ", e);
        return { success: false, message: "failed to fetch vehicle list" };

    }
}
