"use client"
import CustomInput from "@/components/CustomInput"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import CustomButton from "@/components/CustomButton"
import { Container } from "@mui/material"
import { useAlert } from "@/context/AlertContext"
import { schema } from "./helper"
import { ContentFormReq, Vehicle } from "@/types/list"
import { updateDetail } from "./action"

type ContentFormProps = { detail: Vehicle; handleFormSubmit: () => void }
export default function ContentForm({ detail, handleFormSubmit }: ContentFormProps) {
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
        handleFormSubmit();
    }

    return (
        <Container maxWidth="sm" className="p-4">
            <form onSubmit={handleSubmit(onSubmit)} >

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