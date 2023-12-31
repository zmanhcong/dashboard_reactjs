import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { links } from '../data/dummy';

//import Context
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
    const {activeMenu, setActiveMenu, screenSize} = useStateContext();

    //With SmartPhone, after click any link in MenuBar, then menu will close
    const handleCloseSidebar = () => {
        if(activeMenu && screenSize <= 900) {
            setActiveMenu(false);
        }
    }

    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2'
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-blue-300 m-2'  //hover:bg-light-gray

    return (
        <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
            {activeMenu && ( <>
                <div className='flex justify-between items-center'>
                    <Link to="/" onClick={handleCloseSidebar} className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tighter dark:text-white text-slate-900'>
                        <SiShopware />  <span>Shoppy</span>
                    </Link>
                     {/* TooltipComponent for show "menu" text when hover over  */}
                    <TooltipComponent content="Menu" position="ButtonCenter" > 
                        <button 
                                type='button' 
                                onClick={() => {setActiveMenu(
                                    (privActionMenu) => !privActionMenu
                                )}} 
                                className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'>
                            <MdOutlineCancel />
                        </button>
                    </TooltipComponent>
                </div>
                <div className='mt-10'>
                    {links.map((item) => (
                        <div key={item.title} >
                            <p className='text-gray-400 m-4 mt-4 uppercase'>
                                {item.title}
                            </p>
                            {item.links.map((links) => (
                                <NavLink
                                    to={`/$link.name`}
                                    key={links.name}
                                    onClick={handleCloseSidebar}
                                    className={({isActive }) => isActive ? activeLink : normalLink}
                                    >
                                        {links.icon}
                                        <span className='capitalize'>
                                            {links.name}
                                        </span>
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </div>
            </>)}

        </div>
  )
}

export default Sidebar