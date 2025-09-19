import { z } from "zod";

    const emailField =  z
     .string()
     .email( "enter a valid email address",
     )
     .nonempty( "email is required",
     )
     .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

    const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "At least one uppercase letter required")
  .regex(/[0-9]/, "At least one number required")
  .regex(/[^A-Za-z0-9]/, "At least one special character required");

// Sign Up Schema
export const signUpSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email:emailField,
    password: passwordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpData = z.infer<typeof signUpSchema>;

// Sign In Schema
export const signInSchema = z.object({
  email: emailField,
  password: passwordField,
});

export type SignInData = z.infer<typeof signInSchema>;

// forget-password schema
export const forgotPasswordSchema = z.object({
  email: emailField,
}); 

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

// reset password schema
export const resetPasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
  });

  export type ResetPasswordData =z.infer<typeof resetPasswordSchema>;

  export const resendSchema = z.object({
    email: emailField
  });

  export type ResendData = z.infer<typeof resendSchema>;