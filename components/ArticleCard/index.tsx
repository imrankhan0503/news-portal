'use client'

import Link from "next/link"
import ArticleImage from "../ArticleImage"
import { useState } from "react"

type ArticleCardType = {
    article: {
        title: string,
        description: string | null,
        url: string,
        urlToImage: string | null,
        publishedAt: string,
        source: {
            name: string
        }
    }
}


const ArticleCard = ({article}: ArticleCardType) => {

    const [imageError, setImageError] = useState(false)

    if(!article.urlToImage || imageError) {
        return null
    }

    const slug = article.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

    return (
     <>
    
        <article className="overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md mx-4">

            <Link href={`/news/${slug}`} className="block">

          <ArticleImage  image={article.urlToImage} title={article.title} onError={() => setImageError(true)}/>

       <div className="p-4">

             <div className="mb-2 flex items-center justify-between text-sm text-gray-500">
                <span>{article.source.name}</span>

                <span> {new Date(article.publishedAt).toISOString().split("T")[0]}</span>
             </div>
       
       <h2 className="mb-2 text-xl font-bold">{article.title}</h2>

       {article.description && (
       <p className="line-clamp-3 text-gray-600">{article.description}</p>
       )}
       <small>{article.source.name}</small>
       <p className="mt-4 text-sm font-semibold">
            Read full article →
          </p>
       
       </div>
      
        </Link>
        </article>
        </>
    )
}

export default ArticleCard