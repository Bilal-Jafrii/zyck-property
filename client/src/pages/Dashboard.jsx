
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardData from '../components/DashboardData';

export default function Dashboard() {
    const { currentUser } = useSelector((state) => state.user);

    const navigate = useNavigate()
    const authenticated = currentUser.email === "infozyck@gmail.com"
    const checker = () => {
   useEffect(() => {
            if (!authenticated) {
                navigate("/")
            }}, [])   
         }
    return (
        <div>
            {authenticated ? <DashboardData/> : checker()}
        </div>
    )

}
