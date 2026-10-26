

type ArticleImageType = {
    image: string | null,
    title: string,
    onError: () => void;
}

const ArticleImage = ({image, title, onError}: ArticleImageType) => {
     
        if(!image) return null

    return (
        <div className="flex h-52 items-center justify-center bg-gray-200">
            <img className="h-52 w-full object-cover" src={image} alt={title} onError={onError} />
        </div>
    )
}

export default ArticleImage