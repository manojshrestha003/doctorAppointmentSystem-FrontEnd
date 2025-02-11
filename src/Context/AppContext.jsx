import { createContext } from "react";
import { doctors } from "../assets/assets";

export  const AppContex =  createContext();

const AppContextProvier = (props)=>{
    const  value  = {
        doctors,

    }

    return (
        <AppContex.Provider value={value}>
            {props.children}
        </AppContex.Provider>
    )
}
export default AppContextProvier