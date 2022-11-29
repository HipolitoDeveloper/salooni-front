import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {errors} from "@common/typograph";


export const SUserSignin = z.object({
    email: z.string({required_error: errors.EMAIL_REQUIRED}).email(errors.EMAIL),
    password: z.string().refine((password) => password.length < 8, {message: errors.PASSWORD_LENGTH})
})


export type IUserSignin = z.infer<typeof SUserSignin>
