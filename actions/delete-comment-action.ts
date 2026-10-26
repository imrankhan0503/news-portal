'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"

export const DeleteCommentAction = async(commentId: string) => {

    const supabase = await createClient()

    const {error, data} = await supabase.from("commentss").delete().eq("id", commentId)
    
     console.log("Error", error, "Data", data)

        revalidatePath("/")

}