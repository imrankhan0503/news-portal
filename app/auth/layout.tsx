import Link from "next/link"

const AuthLayout = ({children}: {children: React.ReactNode}) => {

    return (
        <>
            <header className="header">
                <Link className="text-2xl font-extrabold" href="/">I-NEWS</Link>
            </header>
            {children}
        </>
    )
}

export default AuthLayout