

const ErrorMessage = ({error}: {error: string}) => {

    return (
        <div className="text-[var(--accent)]">{error ==="NEXT_REDIRECT" ? "" : error}</div>
    )
}

export default ErrorMessage