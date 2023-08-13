import React, { useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../contexts/ContextProvider';

import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '.';

const NavButton = ({title, customFunc, icon, color, dotColor}) => (
    <TooltipComponent content={title} position='ButtonCenter'>
        <button 
            type='button' 
            onClick={customFunc}
            style={{ color}}
            className='relative text-xl rounded-full p-3 hover:bg-light-gray'
        >
            <span 
                style={{ background: dotColor}}
                className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'>
                    {icon}
            </span>
        </button>
    </TooltipComponent>
)

const Navbar = () => {
    //use Context
    const {
        activeMenu, 
        setActiveMenu, 
        isClicked, 
        setIsclicked, 
        handleClick,
        screenSize, setScreenSize
    } = useStateContext();

    //Get size of screen
    useEffect (() => {
      const handleResize = () => setScreenSize(window.innerWidth)

      window.addEventListener('resize', handleResize)

      handleResize();
      return() => window.removeEventListener('resize', handleResize)
    }, []);
    
    //Trigger screen size is changed. if SmartPhone size, MenuBar is close
    useEffect(() => {
        if (screenSize <= 900) {
            setActiveMenu(false);
        }else{
            setActiveMenu(true);
        }

    }, [screenSize])

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
        <NavButton 
            title="Menu"
            customFunc={() => setActiveMenu((preActiveMenu) => !preActiveMenu)} 
            color="blue" 
            icon={<AiOutlineMenu/> }
        />
        <div className='flex'>
            <NavButton 
                title="Menu"
                customFunc={() => handleClick('cart') } 
                color="blue" 
                icon={<FiShoppingCart/> }
            />
            <NavButton 
                title="Chart"
                dotColor="#03C9D7"
                customFunc={() => handleClick('chat') } 
                color="blue" 
                icon={<BsChatLeft/> }
            />
            <NavButton 
                title="Chart"
                dotColor="#03C9D7"
                customFunc={() => handleClick('notification') } 
                color="blue" 
                icon={<RiNotification3Line/> }
            />
            <TooltipComponent
                content='Profile'
                position='BottomCenter'    
            >
                <div 
                    className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
                    onClick={() => handleClick('userProfile')}
                >
                    <img
                        className='rounded-full h-8 w-8'
                        src={avatar}
                    />
                    <p>
                        <span className='text-gray-400 text-14'>Hi,</span> {''}
                        <span className='text-gray-400 font-bold ml-1 text-14'>Michael</span>
                    </p>
                    <MdKeyboardArrowDown />
                </div>
            </TooltipComponent>

            {isClicked.card && <Cart />}
            {isClicked.chat && <Chat />}
            {isClicked.notification && <Notification />}
            {isClicked.useProfile && <UserProfile />}
        </div>
    </div>
  )
}

export default Navbar