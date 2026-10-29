import { getSinglePost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";
import DeleteButton from "./deleteButton";
import Link from "next/link";
import Comments from "./comments";
import AddComments from "./addComment";

const PostPage = async ({ params }: { params: { slug: string } }) => {

  const { slug } = await params;

  const supabase = await createClient()

  const {data: {user}} = await supabase.auth.getUser()

  const { data, error } = await getSinglePost(slug);

  const isAuthor = !! (user && data?.author && user.id === data.author.id)

 
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
  
      {data && ( 
        
        <article className="rounded-xl border border-(--line) bg-(--card) p-6 shadow-sm sm:p-8">
           {data.image && (
              <div className="flex justify-center mx-4 mt-4 space-y-4 p-4 sm:mx-auto sm:mt-6 sm:max-w-md sm:p-6">
                 <img className="block h-64 w-auto max-w-full rounded-lg object-contain" src={data.image} alt={data.title} />
              </div>
            )}
         <div>
          <h3 className="text-3xl font-bold leading-tight text-(--ink) sm:text-4xl text-center">
            {data.title}
          </h3>
          <div className="my-6 border-t border-(--line)">
            {data.content && (
              <p className="mt-3 text-sm text-(--muted)"><span className="font-bold">Content:</span>{data.content}</p>
            )}
          </div>
          </div>
           
          {data.author && (
            <p className="mt-3 text-sm text-(--muted)">
              <span className="font-medium text-(--accent)">
                Created by: {data.author.username}
              </span>
            </p>
          )}
         
            {isAuthor && 
                <div className="flex justify-between">
                  <DeleteButton id ={data.id} />
                  <Link className="register-links" href = {`/${slug}/edit`}>Edit Post</Link>
                </div>
            }
        </article>
      )}
            <Comments postid={data!.id} isLoggedIn={!!user} isAuthor={isAuthor} userId={user ? user?.id : null} />
           {user && <AddComments postId={data!.id} />}
     
    </div>
  )
}

export default PostPage;
