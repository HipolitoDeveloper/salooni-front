import {z} from "zod";
import {errors} from "@common/typograph";

export const SEmployeeSignup = z.object({
    salon: z.object({
        name: z.string(),
        objectId: z.string()
    }),
    employeeName: z.string({required_error: errors.NAME}),
    email: z.string({required_error: errors.EMAIL_REQUIRED}).email(errors.EMAIL),
    tel: z.string({required_error: errors.PHONE}),
    password: z.string({required_error: errors.PASSWORD_REQUIRED}).refine((password) => password.length >= 6, {message: errors.PASSWORD_LENGTH})
})


export type TEmployeeSignup = z.infer<typeof SEmployeeSignup>

export const SEmployeeSignin = z.object({
    email: z.string({required_error: errors.EMAIL_REQUIRED}).email(errors.EMAIL),

})

export type TEmployeeSignin = z.infer<typeof SEmployeeSignin>
