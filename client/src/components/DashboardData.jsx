import React, { useEffect, useState } from 'react'
import DashSidebar from './DashSidebar'
import { useLocation } from 'react-router-dom';
import DashPosts from './DashPosts';
import DashUsers from './DashUsers';
import DashEmails from './DashEmails';
import DashStats from './DashStats';

export default function DashboardData() {
    const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div >
     <div className='text centre font-bold text-green-400 text-4xl py-6 flex justify-center'>Admin Dashboard</div>
     <div className='flex'>
    <div className='md:w-56  rounded-md '>
        <DashSidebar/>
     </div>
        <div className=''>
            {/* stats */}
   {tab === 'stats' && <DashStats/>}
            {/* for posts */}
   {tab === 'posts' && <DashPosts/>}
   {/* for users */}
   {tab === 'users' && <div ><DashUsers/></div>}
    {/* for emails */}
    {tab === 'emails' && <DashEmails/>}
</div>
</div>

    </div>
  )
}
