import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {errors} from "@common/typograph";

export const SEmployeeSignup = z.object({
    salon: z.string(),
    email: z.string({required_error: errors.EMAIL_REQUIRED}).email(errors.EMAIL),
    password: z.string({required_error: errors.PASSWORD_REQUIRED}).refine((password) => password.length >= 6, {message: errors.PASSWORD_LENGTH}),
    confirmPassword: z.string(),
    tel: z.string()

})


export type TEmployeeSignup = z.infer<typeof SEmployeeSignup>

export const SEmployeeSignin = z.object({
    email: z.string({required_error: errors.EMAIL_REQUIRED}).email(errors.EMAIL),

})

export type TEmployeeSignin = z.infer<typeof SEmployeeSignin>
