import { Sidebar } from 'flowbite-react';
import {

    HiArrowSmRight,
    HiDocumentText,
    HiOutlineUserGroup,

    HiChartPie,
    HiOutlineMail,

} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice';
import toast, { Toaster } from 'react-hot-toast';

export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate() 
    const { currentUser } = useSelector((state) => state.user);
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);
    const handleSignOut = async () => {
        try {
          dispatch(signOutUserStart());
          const res = await fetch('/api/auth/signout');
          const data = await res.json();
          if (data.success === false) {
            dispatch(deleteUserFailure(data.message));
            return;
          }
          dispatch(deleteUserSuccess(data));
          navigate('/sign-in')
          toast.success("Sign Out Successfully!")

        } catch (error) {
          dispatch(deleteUserFailure(data.message));
        }
      };
    
    return (
        <Sidebar className='w-full md:w-56  bg-slate-200 h-full'>
            <Toaster/>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    {currentUser && currentUser.isAdmin && (
                        <Link to='/dashboard?tab=stats'>
                            <Sidebar.Item
                                active={tab === 'stats' || !tab}
                                icon={HiChartPie}
                                as='div'
                            >
                                Dashboard
                            </Sidebar.Item>
                        </Link>
                    )}

                    {currentUser.isAdmin && (
                        <Link to='/dashboard?tab=posts'>
                            <Sidebar.Item
                                active={tab === 'posts'}
                                icon={HiDocumentText}
                                as='div'
                            >
                                Posts
                            </Sidebar.Item>
                        </Link>
                    )}
                    {currentUser.isAdmin && (
                        <>
                            <Link to='/dashboard?tab=users'>
                                <Sidebar.Item
                                    active={tab === 'users'}
                                    icon={HiOutlineUserGroup}
                                    as='div'
                                >
                                    Users
                                </Sidebar.Item>
                            </Link>
                            <Link to='/dashboard?tab=emails'>
                                <Sidebar.Item
                                    active={tab === 'emails'}
                                    icon={HiOutlineMail}
                                    as='div'
                                >
                                    Newsletter Emails
                                </Sidebar.Item>
                            </Link>
                        </>
                    )}
                    <Sidebar.Item
                        icon={HiArrowSmRight}
                        className='cursor-pointer'
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}