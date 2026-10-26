import { getPostComments } from "@/lib/supabase/queries";
import DeleteComment from "./deleteComment";

const Comments = async ({ postid, isLoggedIn, isAuthor, userId } : { 
  postid: string, isLoggedIn: boolean, isAuthor: boolean, userId: string | null }) => {

  const comments = await getPostComments(postid);

  if(!comments?.length && !isLoggedIn){
    return null
  }

  return (
    <div className="rounded-xl border border-(--line) bg-(--card) p-6 shadow-sm sm:p-8 mt-4">
      {comments && comments.length ? (
        comments.map((comment, index) => (
          
            <div key={comment.id}
              className="rounded-xl border border-(--line) bg-(--card) p-6 shadow-sm sm:p-8 space-y-4 mt-4">

              <p>{comment.content}</p>
              <p className="text-right">
                By:{" "}
                <span className="text-accent">{comment.userid?.username}</span>
              </p>

              { (isAuthor || (userId === comment.userid.id)) && <DeleteComment commentId={comment.id} number={index + 1} />}
            </div>
          
        ))
      ) : (
      <h2 className="font-bold">No comment yet</h2>
      )}
    </div>
  );
};

export default Comments;
