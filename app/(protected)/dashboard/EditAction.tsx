"use client";

import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import CustomFormDialog from "@/components/CustomFormDialog";
import { Vehicle } from "@/types/list";
import { revalidateDashboard, updateStatus } from "./action";
import { usePathname, useRouter } from "next/navigation";
import ContentForm from "./ContentForm";
import { PAGES } from "@/utils/constant";
import { useAlert } from "@/context/AlertContext";

export default function EditAction({ detail }: { detail: Vehicle }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { showAlert } = useAlert();

    const pathname = usePathname();

    const handleDialogOpen = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);

    const handleAction = async (action: 'approve' | 'reject' | 'edit') => {
        const id = detail.id;
        if (action === 'edit') {
            router.push(`/${PAGES.CONTENT}/${id}`);
        } else {

            const { success, message } = await updateStatus({
                status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'pending',
                id
            },
            );
            showAlert(message, success ? "success" : "error");
            revalidateDashboard(pathname)
        }
    };

    return (
        <>
            <div className="flex flex-row gap-2 justify-end">
                {
                    detail.status !== "pending" ? <></> :
                        <>
                            <CustomButton size="small" color="success" onClick={() => handleAction('approve')}>Approve</CustomButton>
                            <CustomButton size="small" color="error" onClick={() => handleAction('reject')}>Reject</CustomButton>
                        </>

                }
                <CustomButton size="small" variant="outlined" onClick={handleDialogOpen}>Edit</CustomButton>
            </div>


            <CustomFormDialog
                open={open}
                title="Update Content Detail"
                onClose={handleDialogClose}
            >
                <ContentForm detail={detail} handleFormSubmit={() => {
                    revalidateDashboard(pathname)
                    handleDialogClose();
                }} />
            </CustomFormDialog>
        </>
    );
}
