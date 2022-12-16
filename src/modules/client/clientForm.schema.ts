import {z} from "zod";
import {errors} from "@common/typograph";

export const SClientForm= z.object({
    name: z.string({required_error: errors.NAME}),
    email: z.string({required_error: errors.EMAIL_REQUIRED}).email(errors.EMAIL),
    tel: z.string({required_error: errors.PHONE}),
    birthdate: z.any({required_error: errors.BIRTHDATE})
})


export type TClientForm = z.infer<typeof SClientForm>
