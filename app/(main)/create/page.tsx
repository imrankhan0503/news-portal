'use client'

import { CreatePost } from "@/actions/create-post-action"
import { postSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"


const CreatePostPage = () => {

    const postImageSchema = postSchema.omit({image: true}).extend({image: z.unknown().transform(value => {
        return value as FileList}).optional()})

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: zodResolver(postImageSchema)
    })

    const { mutate, error } = useMutation({
        mutationFn: CreatePost,
        
    })

    return (
        <div>
        <h1 className="headings">Create a Post</h1>

        <form onSubmit={handleSubmit(values => { 
        
          const imageForm = new FormData()
          
          if (values.image) imageForm.append('image', values.image[0])

            mutate ({
                title: values.title,
                content: values.content,
                image: imageForm
            })

            })} 
              className="signup-form-card mx-4 mt-4 space-y-4 p-4 sm:mx-auto sm:mt-6 sm:max-w-md sm:p-6">

            <label htmlFor="title">Title</label>
            <input {...register("title")} className="input-search-box mt-1" placeholder="Post title" />
            {errors.title && <ErrorMessage error ={errors.title.message!} />}

            <label htmlFor="content">Content (Optional)</label>
            <textarea {...register("content")} className="input-search-box mt-1" placeholder="Content (optional)"  />

            <label htmlFor="image">Image (Image)</label>
            <input type="file" {...register("image")} className="input-search-box mt-1"  />
            {errors.image && <ErrorMessage error ={errors.image.message!} />}
           

            <button className="register-links w-full">Create Post</button>
            
            {error && <ErrorMessage error= {error.message} />}

        </form>

        </div>
    )
}

export default CreatePostPage