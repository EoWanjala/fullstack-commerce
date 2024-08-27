import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../actions/userActions"
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { listCategories } from '../actions/productsActions'
import Cart from './Cart'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { slug } = useParams();
    const [search, setSearch] = useState('')

    const [IsSearchOpen, setIsSearchOpen] = useState(false)
    const [IsMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [IsMobileSearchOpen, setIsMobileSearchOpen] = useState(false)


    const userLoginReducer = useSelector((state) => state.userLoginReducer)
    const { userInfo } = userLoginReducer
    console.log("User Info:", userInfo)
    const categoryListReducer = useSelector((state) => state.categoryListReducer);
    const { categories } = categoryListReducer;
    // console.log("Categories:", categories)

    useEffect(() => {
        dispatch(listCategories());
    }, [dispatch]);

    useEffect(()=>{
        const burgerClickHandler = () => {
            setIsMobileMenuOpen(prevState => !prevState);
        };
        const closeMobile = () => {
            setIsMobileMenuOpen(false);
        };
    
        const mobileBackdropClickHandler = () => {
            setIsMobileMenuOpen(false);
        };
    
        document.querySelectorAll('.navbar-burger').forEach(burger => {
            burger.addEventListener('click', burgerClickHandler);
        });
    
        document.querySelectorAll('.navbar-close').forEach(closeButton => {
            closeButton.addEventListener('click', closeMobile);
        });
    
        document.querySelectorAll('.navbar-backdrop').forEach(backdrop => {
            backdrop.addEventListener('click', mobileBackdropClickHandler);
        });
    
        return () => {
            document.querySelectorAll('.navbar-burger').forEach(burger => {
                burger.removeEventListener('click', burgerClickHandler);
            });
    
            document.querySelectorAll('.navbar-close').forEach(closeButton => {
                closeButton.removeEventListener('click', closeMobile);
            });
    
            document.querySelectorAll('.navbar-backdrop').forEach(backdrop => {
                backdrop.removeEventListener('click', mobileBackdropClickHandler);
            });
        };
    }, []);

    const [tooltipVisible, setTooltipVisible] = useState({
        home: false,
        allProducts: false,
        new: false,
        login: false,
        contact: false,
    });

    const handleMouseEnter = (tooltip) => {
        setTooltipVisible(prevState => ({ ...prevState, [tooltip]: true }));
    };

    const handleMouseLeave = (tooltip) => {
        setTooltipVisible(prevState => ({ ...prevState, [tooltip]: false }));
    };



  return (
    <>
        <nav className='w-full flex items-center justify-between py-3 top-0 z-40 bg-primary'>
            <Link to={'/'} className='flex items-center gap-2 mx-3'>
                <img src='/1-02.png' alt='Logo' className='w-10 rounded-full'/>
            </Link>
            

            <div className="md:w-full w-1/2">
                <form className="max-w-2xl mx-auto">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        </div>
                        <input
                        type="search"
                        id="default-search"
                        className="block w-full p- ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Properties......"
                        required
                        />
                    </div>
                </form>
            </div>
            
            <div className='mx-2 flex'>
                <Link to={'/login'} className='text-white  hidden md:block'>
                    <svg className="flex-shrink-0 w-5 h-5 text-grade hover:text-grade/30 transition duration-75 group-hover:text-gray-light" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                    </svg>
                    {userInfo ? userInfo.username : "Login"}
                </Link>

                <Cart />
                
                <div className="lg:hidden">
                    <button className="navbar-burger flex items-center text-white p-3">
                        <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Mobile menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </button>
                </div>
            </div>
            
        </nav>
        <nav className='bg-grade md:block hidden'>
            <div className='flex mt- gap-x-5 items-center justify-center'>
                <Link>
                    <p className='text-white text-md font-medium my-3'>All Products</p>
                </Link>
                <Link to={'/'}>
                    <p className='text-white text-md font-medium my-3'>Home</p>
                </Link>
                {categories.map(category => (
                        <Link key={category.slug} to={`/category/${category.slug}`}>
                            <p className='text-white text-md font-medium my-3'>{category.title}</p>
                        </Link>
                    ))}
                <Link>
                    <p className='text-white text-md font-medium my-3'>Contact Us</p>
                </Link>
            </div>
        </nav>
        <div className={`relative z-50 ${IsMobileMenuOpen ? "" : "hidden"}`}>
            <div className='navbar-backdrop fixed inset-0 bg-gray-800 opacity-25'></div>
            <nav className='fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 bg-gray-300 border-r border-gray-400 overflow-y-auto'>
                <div className='flex items-center mb-8 mx-3'>
                    <Link to={'/'}>
                        <img src='1-02.png' className='w-10 rounded-full'/>
                    </Link>
                    <button class="navbar-close right-0 absolute">
                        <svg class="h-10 w-10 text-grade cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className='mx-3'>
                    <ul className='gap-y-10'>
                    {categories.map(category => (
                        <Link key={category.slug} to={`/category/${category.slug}`}>
                            <p className='text-primary hover:text-grade bg-gray-200 py-1.5 rounded-lg px-3 text-md my-3 text-xl font-medium'>{category.title}</p>
                        </Link>
                    ))}
                    </ul>
                </div>
            </nav>
        </div>

        {/* Bottom Nav */}
        <div className='fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 md:hidden'>
            <div className='grid h-full max-w-lg grid-cols-5 mx-auto'>
                
                <button 
                    onMouseEnter={() => handleMouseEnter('home')} 
                    onMouseLeave={() => handleMouseLeave('home')} 
                    type="button" 
                    className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
                >
                    <svg className="w-5 h-5 mb-1 text-gray-500 group-hover:text-grade" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                    </svg>
                    <span className="sr-only">Home</span>
                </button>
                {tooltipVisible.home && (
                    <div id="tooltip-home" role="tooltip" className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm">
                        Home
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                )}
               <button 
                    onMouseEnter={() => handleMouseEnter('allProducts')} 
                    onMouseLeave={() => handleMouseLeave('allProducts')} 
                    type="button" 
                    className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                >
                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-grade" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                    </svg>
                    <span className="sr-only">All Products</span>
                </button>
                {tooltipVisible.allProducts && (
                    <div id="tooltip-wallet" role="tooltip" className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm">
                        All Products
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                )}
                <div class="flex items-center justify-center">
                    <button data-tooltip-target="tooltip-new" type="button" class="inline-flex items-center justify-center w-10 h-10 font-medium bg-grade rounded-full hover:bg-red-700 group focus:ring-4 focus:ring-red-300 focus:outline-none">
                        <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                        </svg>
                        <span class="sr-only">New item</span>
                    </button>
                </div>
                <div id="tooltip-new" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
                    Create new item
                <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Link to={'/login'}>
                    <button
                    onMouseEnter={() => handleMouseEnter('login')}
                    onMouseLeave={() => handleMouseLeave('login')}
                    type='button'
                    className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 group">
                        <svg class="w-5 h-5 mb-1 text-gray-500  group-hover:text-grade" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                        <span class="sr-only">Login</span>
                    </button>
                    {tooltipVisible.login && (
                        <div id="tooltip-wallet" role="tooltip" className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm">
                        Login
                            <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>
                    )}
                </Link>
                
                <button 
                onMouseEnter={() => handleMouseEnter("contact")}
                onMouseLeave={() => handleMouseLeave("contact")}
                class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                    <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-grade" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                </svg>
                    <span class="sr-only">Contact </span>
                </button>
                {tooltipVisible.contact && (
                    <div id="tooltip-contact" role="tooltip" className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm">
                        Contact Us
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                )}
            </div>
        </div>
    </>
  )
}

export default Navbar