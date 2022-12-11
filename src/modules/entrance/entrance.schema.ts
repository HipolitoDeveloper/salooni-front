import {z} from "zod";
import {errors} from "@common/typograph";

export const SUserSignin = z.object({
    email: z.string({required_error: errors.EMAIL_REQUIRED}).email(errors.EMAIL),
    password: z.string({required_error: errors.PASSWORD_REQUIRED}).refine((password) => password.length >= 6, {message: errors.PASSWORD_LENGTH})
})


export type TUserSignin = z.infer<typeof SUserSignin>
