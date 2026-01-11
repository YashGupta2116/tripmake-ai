"use server";

import { auth, ErrorCode } from "@/lib/auth";
import { signinSchema, signupSchema } from "@/lib/zod-schemas";
import { APIError } from "better-auth/api";

export async function signupEmailAction(
  name: string,
  email: string,
  password: string
) {
  const { data, error, success } = signupSchema.safeParse({
    name,
    email,
    password,
  });

  if (!success) {
    return { error: error.issues[0]?.message || "Validation Failed" };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });

    return { error: null };
  } catch (error) {
    console.log(error);
    if (error instanceof APIError) {
      const errorCode = error.body ? (error.body.code as ErrorCode) : "UNKNOWN";

      switch (errorCode) {
        case "USER_ALREADY_EXISTS":
          return { error: "Oops! Something went wrong. Please try again." };
        default:
          return { error: error.message };
      }
    }
    return { error: "Internal Server Error" };
  }
}

export async function signinEmailAction(email: string, password: string) {
  const { data, error, success } = signinSchema.safeParse({
    email,
    password,
  });

  if (!success) {
    return { error: error.issues[0].message || "Form Validation Failed" };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });
    return { error: null };
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message };
    }

    return { error: "Internal Server Error" };
  }
}
