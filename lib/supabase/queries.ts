import { type QueryData } from "@supabase/supabase-js";
import { createClient } from "./browserClient";


export const getHomePosts = async (
  supabase: ReturnType<typeof createClient>,
) => {
  return await supabase
    .from("posts")
    .select('id, title, slug, content, image, created_at, author("id", "username")')
    .order("created_at", { ascending: false });
};

export const getSinglePost = async (slug: string) => {
  const supabase = createClient();

  return await supabase
    .from("posts")
    .select('id, title, content, image, author("id", "username")')
    .eq("slug", slug)
    .single();
};

export const searchPosts = async (searchTerm: string) => {
  const supabase = createClient();

  return await supabase
    .from("posts")
    .select("title, slug")
    .textSearch("title", searchTerm);
}

export const getPostComments = async(postid: string) => {
  const supabase = createClient()
  const {data, error} =
          await supabase.from("commentss")
                .select('id, content, userid("id", "username")')
                .eq("postid", postid)
                .order("created_at", {ascending: false})

                if(error) throw error
                          
              return data;
                
}

export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>;

export type SinglePostType = QueryData<ReturnType<typeof getSinglePost>>;

export type SearchPostType = QueryData<ReturnType<typeof searchPosts>>;

export type CommentsType = QueryData<ReturnType<typeof getPostComments>>;
