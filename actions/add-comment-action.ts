'use server'

import { createClient } from "@/lib/supabase/serverClient"
import z from "zod"
import { commentSchema } from "./schemas"
import { revalidatePath } from "next/cache"

export const AddCommentAction = async({commentdata, postId} : {commentdata: z.infer<typeof commentSchema>, postId: string}) => {

    const supabase = await createClient()

    const parsedData = commentSchema.parse(commentdata)

    const {data: {user}} = await supabase.auth.getUser()

    if(!user) throw new Error("Need login to add comments")

        await supabase.from("commentss")
              .insert({postid: postId, userid: user.id, ...parsedData}).throwOnError()

              revalidatePath("/")
}