import z, { email, string } from "zod";

export const signupSchema = z.object({
  name: string(),
  email: email(),
  password: string()
    .min(8, "password must be longer than 8 characters")
    .max(20, "Password cannot be longer than 20 characters"),
});

export const signinSchema = z.object({
  email: email(),
  password: string(),
});
