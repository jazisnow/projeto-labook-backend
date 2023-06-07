import z from 'zod'

export interface loginInputDTO {
    email: string,
    password: string
}

export interface loginOutputDTO {
    token: string
}

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4)
}).transform(data => data as loginInputDTO)