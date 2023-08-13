  import React, {createContext, useContext,useState} from "react";

  const StateContext = createContext();
  const initialState = {
    chat: false,
    cart: false,
    useProfile: false,
    notification: false,
  }

//ContextProvider:r providing the context value to all the components that are wrapped inside it. in this case, value is activeMenu(true)
export const ContextProvider = ({children}) => {
    const [activeMenu, setActiveMenu] = useState(true)

    //context use for button in navbar
    const [isClicked, setIsClicked] = useState(initialState)

    //handle when click button in navbar
    const handleClick = (clicked) => {
        setIsClicked({ ... initialState, [clicked] : true});
    }

    return(
        <StateContext.Provider
            value={{
                activeMenu: activeMenu,
                setActiveMenu: setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

//The useContext hook is a way to consume a context value in a functional component...custom hook that any component can call to access the current value of the StateContext.
export const useStateContext = () => useContext(StateContext)