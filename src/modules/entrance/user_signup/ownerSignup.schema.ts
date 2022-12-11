import {z} from "zod";
import {SUserSignin} from "@modules/entrance/entrance.schema";
import {errors} from "@common/typograph";

export const SOwnerSignup = z.object({
    salonName: z.string({required_error: errors.SALON_NAME}),
    employeeName: z.string({required_error: errors.NAME}),
    email: z.string({required_error: errors.EMAIL_REQUIRED}).email(errors.EMAIL),
    tel: z.string({required_error: errors.PHONE}),
    password: z.string({required_error: errors.PASSWORD_REQUIRED}).refine((password) => password.length >= 6, {message: errors.PASSWORD_LENGTH})
})

export type TOwnerSignup = z.infer<typeof SOwnerSignup>

