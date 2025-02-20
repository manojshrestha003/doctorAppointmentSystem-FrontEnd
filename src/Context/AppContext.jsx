import { createContext, useState } from "react";

import axios from 'axios'
import { useEffect } from "react";
import {toast} from 'react-toastify'

export  const AppContex =  createContext();

const AppContextProvier = (props)=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctor] = useState([]);
    const [token , setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false);
    const [userData, setUserData]=useState(false)
   
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
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };
    
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token]);  
    
       

       
    const  value  = {
        doctors, token, setToken, backendUrl, userData, setUserData, loadUserProfileData, getDoctorsData
       
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