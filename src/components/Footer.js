import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='flex flex-row items-center mb-2'>
            <div className=' font-semibold w-full '>
                <div className="flex flex-row justify-center items-center text-sm text-black ">
                    <div className="flex flex-row justify-center items-center px-2  border-black border-r-[1px] leading-[0.9]">
                        <Link href="https://" className=''>Contact us</Link>
                    </div>
                    <div className="px-2 border-black border-r-[1px] leading-[0.9]">
                        <Link href="https://">Terms and conditions</Link>
                    </div>
                    <div className="px-2">
                        <Link href="https://">Data privacy policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;