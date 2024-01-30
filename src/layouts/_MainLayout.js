import Header from '../components/Header'
import Footer from '../components/Footer'

const MainLayout = ({ children }) => {
    console.log("children",children)
    return (
        <div className='flex flex-col items-center max-w-[1280px] mx-auto min-h-[100vh]'>
            <Header />
            <main className='flex-1 w-full'>{children}</main>
            <Footer />
        </div>
    )
}

export default MainLayout;