import { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    return (
        <Context.Provider value={{ cart, setCart }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);