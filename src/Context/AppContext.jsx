import { createContext, useState } from "react";

import axios from 'axios'
import { useEffect } from "react";
import {toast} from 'react-toastify'

export  const AppContex =  createContext();

const AppContextProvier = (props)=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctor] = useState([]);
    const [token , setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false);
   
    const getDoctorsData = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/list')
        if(data.success){
            setDoctor(data.doctors)

        }
        else{
            toast.error(data.message)
        }
            
        } catch (error) {
            toast.error(error.message)
        }
        
    }
    const  value  = {
        doctors, token, setToken, backendUrl
       
   }
    useEffect(()=>{
         getDoctorsData()
    },[])

    return (
        <AppContex.Provider value={value}>
            {props.children}
        </AppContex.Provider>
    )
}
export default AppContextProvier