import ArticleCard from "@/components/ArticleCard"


const NewsPage = async() => {

     const response = await fetch(`https://newsapi.org/v2/everything?q=technology&sortBy=publishedAt&language=en&apiKey=${process.env.NEWS_API_KEY}`)

   const newsData = await response.json()



    return (
          <div>
            <h1 className="headings">All News</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {newsData.articles.filter((article: any) => article.urlToImage).map((article: any, index: number) => (
                    <ArticleCard key={index} article={article} />
                ))}
            </div>
          </div>
    )
}

export default NewsPage