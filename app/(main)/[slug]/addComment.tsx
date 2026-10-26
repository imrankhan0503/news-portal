'use client'

import { AddCommentAction } from "@/actions/add-comment-action"
import { commentSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"



const AddComments = ({postId}: {postId: string}) => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver:zodResolver(commentSchema)
    })

    const {mutate, error} = useMutation({
        mutationFn: AddCommentAction,
        onSuccess: () => reset(),
        onSettled: () => toast("Your comments have been added successfully")
    })

    return (
        <form onSubmit={handleSubmit(values => mutate({commentdata: {content: values.content}, postId}))} className="rounded-xl border border-(--line) bg-(--card) p-6 shadow-sm sm:p-8 mt-4">
            <label htmlFor="content"></label>
            <textarea {...register("content")} className="signup-form-input" placeholder="add comments" />
            {errors.content && <ErrorMessage error = {errors.content.message!} />}

            <button className="register-links w-full">Add Comment</button>
            {error && <ErrorMessage  error= {error.message}/>}
        </form>
    )
}

export default AddComments