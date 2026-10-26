import { z } from 'zod'


export const logInSchemas = z.object({
    email: z.email("Enter correct email"),
    password: z.string().min(6, "Password must be at least six characters")
})

export const signUpSchemas = z.object({
    username: z.string().min(5, "Username at least 5 characters"),
    email: z.email("Enter correct email"),
    password: z.string().min(6, "Password must be at least six characters")
})

export const postSchema = z.object({
    title: z.string().min(6, "Your title must be at least 6 characters long"),
    content: z.string("content").optional(),
    image: z.instanceof(FormData).optional()
})

export const commentSchema = z.object({
    content: z.string().min(5, "Must be at least five character long")
})