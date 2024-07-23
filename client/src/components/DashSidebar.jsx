import { Sidebar } from 'flowbite-react';
import {

    HiArrowSmRight,
    HiDocumentText,
    HiOutlineUserGroup,

    HiChartPie,
    HiOutlineMail,

} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signOutUserStart } from '../redux/user/userSlice';

export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);
    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signOutUserStart());
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    // 010900035617622
    return (
        <Sidebar className='w-full md:w-56  bg-slate-200 h-full'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    {currentUser && currentUser.isAdmin && (
                        <Link to='/dashboard?tab=dash'>
                            <Sidebar.Item
                                active={tab === 'dash' || !tab}
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
                        onClick={handleSignout}
                    >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}