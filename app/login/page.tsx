"use client"
import CustomInput from "@/components/CustomInput"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/navigation"
import CustomButton from "@/components/CustomButton"
import { Container } from "@mui/material"
import CustomTypography from "@/components/CustomTypography"
import { PAGES } from "@/utils/constant"
const schema = yup
    .object({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required"),
    });

type Inputs = {
    username: string
    password: string
}

export default function Login() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema)
    })
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        router.push(`/${PAGES.DASHBOARD}`)
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
                    helperText={errors.password?.message}
                />
                <CustomButton className="!mt-4" label="Login" type="submit" fullWidth />
            </form>
        </Container>
    )
}