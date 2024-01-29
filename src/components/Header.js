import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
    const clickMenu = () => {
        console.log("clicked")
    }
    return (
        <header className='flex flex-row items-center w-full justify-between px-5 py-8'>
            <div className=''>
                <a href='http://localhost:3000' className='flex flex-row items-center'>
                    <img src='https://framerusercontent.com/images/y0du0diB10hrbQx6KEYRnVXEI.png' alt="logo" className='block w-[40px] h-[40px]'></img>
                    <span className='text-2xl font-bold text-slate-600'>AI Stylista</span>
                </a>
            </div>
            <div>
                <button onClick={clickMenu} className='flex flex-row items-center'>
                    <span className='text-xl mr-4 font-medium'>Menu</span>
                    <RxHamburgerMenu className='text-xl'/>
                </button>
            </div>
        </header>
    )
}

export default Header;