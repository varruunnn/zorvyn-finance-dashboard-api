import { email, z } from "zod";

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'ANALYST', 'VIEWER'])
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const recordSchema = z.object({
    amount: z.number().positive(),
    type: z.enum(['INCOME', 'EXPENSE']),
    category: z.string().min(1),
    transactionDate: z.coerce.date(),
    notes: z.string().optional()
});