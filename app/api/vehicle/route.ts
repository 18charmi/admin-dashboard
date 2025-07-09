import { Vehicle, VehicleList } from '@/types/list'
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server';

let localStatus: Record<string, Partial<Vehicle>> = {};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get('limit')
    const skip = searchParams.get('skip')
    const id = searchParams.get('id')

    try {
        if (id) {
            // get product detail
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
            const mergedDetail = {
                id: detail.id,
                title: detail.title,
                description: detail.description,
                ...( localStatus[detail.id] ? localStatus[detail.id] : { status: localStatus[detail.id] ?? 'pending' })
            };
            return NextResponse.json({ success: true, data: mergedDetail });

        } else {
            // get product listing
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
            const mergedProducts = detail.products.map((item) => ({
                id: item.id,
                title: item.title,
                description: item.description,
                ...(localStatus[item.id] ? localStatus[item.id] : { status: localStatus[item.id] ?? 'pending' })
            }));
            return NextResponse.json({ success: true, data: { ...detail, products: mergedProducts } });

        }
    } catch (e) {

        console.log("Error fetchVehicleList : ", e);
        return NextResponse.json({ success: false, message: "failed to fetch vehicle list" });

    }
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const id = body.id;

    try {
        // can add api to update product detail
        localStatus[id] = { ...localStatus[id], status: localStatus[id]?.status ?? 'pending', ...body, };
        return NextResponse.json({ success: true, message: "Update product detail successfully" });

    } catch (e) {

        console.log("Error updateDetail : ", e);
        return NextResponse.json({ success: false, message: "Failed to update product detail" });

    }
}