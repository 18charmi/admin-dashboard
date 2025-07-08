export type Pagination = {
    limit: number,
    skip: number,
    total: number
}
export type Vehicle = {
    id: number,
    title: string,
    description: string
}
export type VehicleList = {
    products: Vehicle[]
} & Pagination