"use client"
import CustomInput from "@/components/CustomInput"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import CustomButton from "@/components/CustomButton"
import { Container } from "@mui/material"
import CustomTypography from "@/components/CustomTypography"
import { PAGES } from "@/utils/constant"
import { useAlert } from "@/context/AlertContext"
import { schema } from "./helper"
import { ContentFormReq, Vehicle } from "@/types/list"
import { updateDetail } from "./action"

type ContentFormProps = { detail: Vehicle }
export default function ContentForm({ detail }: ContentFormProps) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContentFormReq>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: detail.title,
            description: detail.description,
        }
    })
    const { showAlert } = useAlert();
    const onSubmit: SubmitHandler<ContentFormReq> = async (data) => {
        const { success, message } = await updateDetail(data, detail.id.toString());
        showAlert(message, success ? "success" : "error");
        if (success) {
            router.push(`/${PAGES.DASHBOARD}`)
        }
    }

    return (
        <Container maxWidth="sm" className="p-4">
            <form onSubmit={handleSubmit(onSubmit)} >

                <>
                    <CustomTypography text="Update Content Detail" variant="subtitle1" component="label" className="text-gray-600" />
                    <hr className="my-4 text-gray-400 w-full" />
                </>

                <CustomInput label="Title"
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />
                <CustomInput label="Description"
                    {...register("description")}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />
                <CustomButton className="!mt-4" label="Update Detail" type="submit" fullWidth />
            </form>
        </Container>
    )
}