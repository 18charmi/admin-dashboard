export type Pagination = {
    limit: number,
    skip: number,
    total: number
}
export type Vehicle = {
    id: number,
    title: string,
    description: string,
    status: string
}
export type VehicleList = {
    products: Vehicle[]
} & Pagination

export type ContentFormReq = Pick<Vehicle, 'title' | 'description'> 