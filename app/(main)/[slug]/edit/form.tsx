'use client'

import { EditPost } from "@/actions/edit-page-action"
import { postSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { type Tables } from "@/lib/supabase/database.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"



const EditPageForm = ({initialValues, postId}: {initialValues: Pick<Tables<'posts'>, "title" | "content" | "image">, postId: string}) => {

   
    const postImageSchema = postSchema.omit({image: true}).extend({image: z.unknown().transform(value => {
           return value as FileList}).optional()})

   
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(postImageSchema),
        defaultValues: {
            title: initialValues.title,
            content: initialValues.content || undefined,
            image: initialValues.image || undefined
        }
    })

     const {mutate, error} = useMutation({
        mutationFn: EditPost
     })

    return (
        <form onSubmit={handleSubmit(values => {
            let imageForm = undefined;
              if (values.image && typeof values.image !== "string"){
                    imageForm = new FormData()
                    imageForm.append('image', values.image[0])
              } 
            
            mutate({
                postdata:{
                    title: values.title,
                    content: values.content,
                    image:imageForm
                },
                    postId})}
        
        )} 
        
          className="signup-form-card mx-4 mt-4 space-y-4 p-4 sm:mx-auto sm:mt-6 sm:max-w-md sm:p-6">

            <label htmlFor="title">Title</label>
            <input {...register("title")} className="input-search-box mt-1" placeholder="Post title" />
            {errors.title && <ErrorMessage error ={errors.title.message!} />}

            <label htmlFor="content">Content (Optional)</label>
            <textarea {...register("content")} className="input-search-box mt-1" placeholder="Content (optional)"  />

            {initialValues.image && <img src={initialValues.image} alt={initialValues.title} />}

            <label htmlFor="image">Change Image (Optional)</label>
            <input type="file" {...register("image")} className="input-search-box mt-1"  />
            {errors.image && <ErrorMessage error ={errors.image.message!} />}


            <button className="register-links w-full">Edit Post</button>
             {error && <ErrorMessage error= {error.message} />}

        </form>
    )
}

export default EditPageForm