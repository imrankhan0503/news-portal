import Link from "next/link"


const NewsDetailPage = async({params}: {params: Promise<{slug: string}>}) => {

    const { slug } = await params

    const response = await fetch(`https://newsapi.org/v2/everything?q=technology&sortBy=publishedAt&language=en&apiKey=${process.env.NEWS_API_KEY}`)
    const newsData = await response.json()

   const articleLinks =  newsData.articles?.find( (article: any) => {
   const articleSlug = article.title

      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

      return articleSlug === slug
   })

     if(!articleLinks) {
        return <h1>Article not found</h1>
     }


    return (
        <div>
            <article className="mx-auto max-w-4xl p-6">
                <img className="mb-6 h-96 w-full rounded-xl object-cover" src={articleLinks.urlToImage} alt={articleLinks.title} />
            
            <p className="mb-2 text-sm text-gray-500">
             {articleLinks.source.name} ·{" "}
             {new Date(articleLinks.publishedAt).toLocaleDateString()}
            </p>

           <h1 className="mb-4 text-4xl font-bold">{articleLinks.title}</h1>

           <p className="mb-6 text-lg text-gray-600">{articleLinks.description}</p>

          <p className="mb-6">{articleLinks.content}</p>

      <Link href={articleLinks.url} target="_blank"rel="noopener noreferrer"className="font-semibold underline">
            Read original article →
      </Link>
            
    </article>
        </div>
    )
}

export default NewsDetailPage