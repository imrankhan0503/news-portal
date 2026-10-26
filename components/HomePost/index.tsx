"use client"

import { HomePostType } from "@/lib/supabase/queries";
import Link from "next/link";

const HomePosts = ({ posts }: { posts: HomePostType }) => {
  return (
    <>
      {posts.map((post) => (
        <article
          key={post.id}
          className="overflow-hidden rounded-xl border border-(--line) bg-white shadow-sm transition-shadow hover:shadow-md">

          <Link href={`/${post.slug}`} className="block h-full">
            {post.image && (
              <div className="h-52 w-full overflow-hidden bg-gray-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="block h-full w-full object-cover"/>
              </div>
            )}

              <div className="p-4">
                 <div className="mb-2 text-right text-sm text-gray-500">
                   <span> {new Date(post.created_at).toLocaleDateString("sv-SE")}</span> 
                  </div>
              </div>

            <div className="p-4">
              <h3 className="mb-3 text-xl font-bold text-(--ink)">
                {post.title}
              </h3>

              {post.author && (
                <p className="mt-3 text-right text-sm text-(--muted)">
                  Created by: {post.author.username}
                </p>
              )}
            </div>
          </Link>
        </article>
      ))}
    </>
  )
}

export default HomePosts