import { getSinglePost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation";
import EditPageForm from "./form";



const EditPost = async ({ params }: { params: { slug: string } }) => {

    const { slug } = await params;

    const supabase = await createClient()

    const {data: {user}} = await supabase.auth.getUser()

    const { data, error } = await getSinglePost(slug);
    
    if (user && data?.author && user.id !== data.author.id)

        redirect("/")

    return (
        <>
        {data && (
        <div className="mx-auto max-w-3xl px-4 py-8">
            
         <div className="rounded-xl border border-(--line) bg-(--card) p-6 shadow-sm sm:p-8">
         
          <h1 className="text-3xl semi-bold leading-tight text-(--ink) sm:text-4xl text-center">
            Edit: {data.title}
          </h1>
          <EditPageForm initialValues={ { title: data.title, content: data.content, image: data.image } } postId= {data.id}   />
          </div>
          
        </div>
        )}
        </>
    )
}

export default EditPost