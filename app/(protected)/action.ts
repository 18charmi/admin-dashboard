'use server';
import { PAGES } from '@/utils/constant';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutUser() {

    try {

        (await
            cookies()).delete('session');


    } catch (e) {

        console.log("Error logoutUser : ", e);

    }
    redirect(`/${PAGES.LOGIN}`)

}
