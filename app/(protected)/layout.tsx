import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Header from "@/app/(protected)/Header";
import type { Metadata } from "next";
import { PAGES } from '@/utils/constant';

export const metadata: Metadata = {
    title: "Admin Panel",
    description: "Preview Dashboard of available products listing",
};

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const session = (await cookies()).get('session')?.value;

    if (!session) {
        redirect(`/${PAGES.LOGIN}`);
    }

    return <>
        <Header />
        <main>
            {children}
        </main>
    </>
}


