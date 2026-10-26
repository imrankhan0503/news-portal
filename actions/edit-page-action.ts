'use server'

import z from "zod";
import { postSchema } from "./schemas";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/supabase/slugify";
import { uploadImage } from "@/lib/supabase/upload-image";


 export const EditPost = async({postdata, postId} : {postdata: z.infer<typeof postSchema>, postId: string } ) => {

    const parsedData = postSchema.parse(postdata)

    const supabase = await createClient()

    const imageFile = postdata.image?.get("image")

    const {data: post, error} = await supabase.from("posts")
        .select("*")
        .eq("id", postId)
        .single()    

        if (!post) throw  new Error("Post doesn't exist")

    let imageUrl;

    if(typeof imageFile !== "undefined") {

        if(!(imageFile instanceof File) && imageFile !== null) {

        throw Error ("Image is not in a valid format")
       }

       imageUrl = imageFile  ?  await uploadImage(imageFile) : null
    } 

    else {
        imageUrl = post.image
    }

            const {data: updatedPost} = await supabase.from("posts")
                  .update( {...parsedData, slug: slugify(parsedData.title), image: imageUrl })
                  .eq("id", postId)
                  .select("slug")
                  .single()
                  .throwOnError()

                  revalidatePath("/")
                  redirect(`/${updatedPost.slug}`)
    }