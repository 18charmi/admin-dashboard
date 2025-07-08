export type LoginForm = {
    username: string
    password: string
}
export type LoginRes = {
    "id": string,
    "username": string,
    "email": string,
    "firstName": string,
    "lastName": string,
    "gender": string,
    "image": string,
    "accessToken": string,
    "refreshToken": string
}