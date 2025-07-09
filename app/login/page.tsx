"use client"
import CustomInput from "@/components/CustomInput"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import CustomButton from "@/components/CustomButton"
import { Container } from "@mui/material"
import CustomTypography from "@/components/CustomTypography"
import { PAGES } from "@/utils/constant"
import { schema } from "./helper"
import { LoginForm } from "@/types/user"
import { useAlert } from "@/context/AlertContext"
import { loginUser } from "./action"

export default function Login() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: yupResolver(schema)
    })
    const { showAlert } = useAlert();
    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        const { success, message } = await loginUser(data);
        showAlert(message, success ? "success" : "error");
        if (success) {
            router.push(`/${PAGES.DASHBOARD}?page=1`)
        }
    }

    return (
        <Container maxWidth="sm" >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center min-h-screen">

                <>
                    <CustomTypography text="Welcome Back" variant="h2" component="h2" letterSpacing={-1} className="text-gray-600" />
                    <hr className="my-4 text-gray-400 w-full" />
                </>

                <CustomInput label="Username"
                    {...register("username")}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                />
                <CustomInput label="Password"
                    {...register("password")}
                    error={!!errors.password}
                    type="password"
                    helperText={errors.password?.message}
                />
                <CustomButton className="!mt-4" label="Login" type="submit" fullWidth />
            </form>
        </Container>
    )
}