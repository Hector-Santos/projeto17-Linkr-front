import { createContext, useState, useEffect } from "react";

export const TokenContext = createContext();

export default function TokenProvider({children}){
    const [token , setToken] = useState(null);
    const [valor , setValor] = useState(1);
    const header = (token)&&{'headers':{'Authorization':`Bearer ${token}`}};
    

    return (
        <TokenContext.Provider value={{token, setToken, header, valor, setValor}}>
            {children}
        </TokenContext.Provider>
    )


}