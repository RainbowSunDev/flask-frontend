import Header from '../components/Header'
import Footer from '../components/Footer'

const MainLayout = ({ children }) => {
    console.log("children",children)
    return (
        <div className='flex flex-col items-center max-w-[1280px] mx-auto'>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default MainLayout;