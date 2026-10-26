'use client'

import { DeletePost } from "@/actions/delete-action"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const DeleteButton = ({id}: {id: string}) => {

    const {mutate} = useMutation({
        mutationFn: DeletePost,
        onSettled: () => toast("Your post deleted successfully", {className: "!text-accent !border-none"})
    })

    return (
        <button onClick={() => mutate(id)} className="register-links">Delete Post</button>
    )
}

export default DeleteButton