import Header from "@/components/Header/header"

const MainLayout = ({children}: {children: React.ReactNode}) => {

    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default MainLayout