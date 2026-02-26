import z from 'zod'

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
})

export const signupSchema = z.object({
  fullName: z.string().min(4),
  email: z.email(),
  password: z.string().min(6).max(20),
})
