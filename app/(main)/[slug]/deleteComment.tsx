'use client'

import { DeleteCommentAction } from "@/actions/delete-comment-action"
import { useMutation } from "@tanstack/react-query"


const DeleteComment = ({commentId, number}: {commentId: string, number: number}) => {

    const {mutate} = useMutation({
        mutationFn: DeleteCommentAction
    }) 

    return (
        <button onClick={() => mutate(commentId)} className="register-links">Delete Comment {number}</button>
    )
}

export default DeleteComment