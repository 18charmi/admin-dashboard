'use server';
import { cookies } from 'next/headers';
import { LoginForm, LoginRes } from '@/types/user';

export async function loginUser(data: LoginForm) {

    try {

        const response = await fetch(`${process.env.API_HOST}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })

        if (!response.ok) {
            throw new Error(`HTTP error status ${response.status}`);
        }
        const detail = await response.json() as LoginRes;
        const { accessToken } = detail;

        (await
            cookies()).set('session', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 60 * 60,
            });

        return { success: true, message: "Login Success" };

    } catch (e) {

        console.log("Error loginUser : ", e);
        return { success: false, message: "Invalid credentials" };

    }
}
