import ArticleCard from "@/components/ArticleCard";
import HomePosts from "@/components/HomePost";
import { getHomePosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";
import Link from "next/link";


export const revalidate = 600
export default async function Home() {

  const supabase = await createClient()

  const {data: {user}} = await supabase.auth.getUser()
  let username = null;
  if (user) { const { data: profile,
     error: profileError } = await supabase 
     .from("users") .select("username") 
     .eq("id", user.id) 
     .maybeSingle() 
     if (profileError) { 
      console.error("Failed to fetch username:", profileError) 
    } 
    username = profile?.username ?? null }


 
  const { data, error } = await getHomePosts(supabase);

  const response = await fetch(
    `https://newsapi.org/v2/everything?q=technology&sortBy=publishedAt&language=en&apiKey=${process.env.NEWS_API_KEY}`,
  );

  const newsData = await response.json();

  return (
    <>
    {user && ( <div className="px-4 pt-4 text-right">
       <p className="text-sm font-medium text-(--accent)">
         Welcome, {username}! </p> </div> )}
    
    <div className="relative">
      <div className="mt-6 text-right absolute right-0 p-2">
        <Link href="/news">View all →</Link>
      </div>

      <div className="text-left">
        <h1 className="text-4xl sm:text-3xl p-4 capitalize">Latest News</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsData.articles
          ?.filter((article: any) => article.urlToImage)
          .slice(0, 3)
          .map((article: any, index: number) => (
            <ArticleCard key={index} article={article} />
          ))}
      </div>

       <h2 className="text-4xl sm:text-3xl text-left p-4 capitalize">Latest posts</h2>

      <div className="mx-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
       {data && <HomePosts posts={data} />}
       </div>

    </div>
    </>
  );
}
