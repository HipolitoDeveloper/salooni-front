import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {errors} from "@common/typograph";


export const SOwnerSignin = z.object({
    email: z.string({required_error: errors.EMAIL_REQUIRED}).email(errors.EMAIL),
    password: z.string({required_error: errors.PASSWORD_REQUIRED}).refine((password) => password.length < 8, {message: errors.PASSWORD_LENGTH})
})


export type IOwnerSignin = z.infer<typeof SOwnerSignin>
