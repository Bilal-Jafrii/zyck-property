import React, { useEffect, useState } from 'react'


import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DashListingItem from './DashListingItem';


export default function DashPosts() {
    const [offerListings, setOfferListings] = useState([]);
    const [saleListings, setSaleListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);
    
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    useEffect(() => {
        const fetchOfferListings = async () => {
            try {
                const res = await fetch('/api/listing/get?offer=true');
                const data = await res.json();
                setOfferListings(data);
                fetchRentListings();
            } catch (error) {
                console.log(error);
            }
        };
        const fetchRentListings = async () => {
            try {
                const res = await fetch('/api/listing/get?type=rent');
                const data = await res.json();
                setRentListings(data);
                fetchSaleListings();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSaleListings = async () => {
            try {
                const res = await fetch('/api/listing/get?type=sale');
                const data = await res.json();
                setSaleListings(data);
            } catch (error) {
                log(error);
            }
        };
        fetchOfferListings();
    }, []);
    return (
        <>
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList   sx={{px:'399px'}} onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Offers" value="1" />
            <Tab label="Rent" value="2" />
            <Tab label="Sale" value="3" />
          </TabList>
        </Box>
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        <TabPanel value="1"> {offerListings && offerListings.length > 0 && (
                    <div className=''>
                        <div className='my-3'>
                            <h2 className='text-2xl font-semibold lg:font-bold text-gradient'>Recent offers <span >({offerListings.length})</span></h2>
                          
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {offerListings.map((listing) => (
                                <DashListingItem listing={listing} key={listing._id} />
                            ))}
                        </div>
                    </div>
                )}</TabPanel>
        <TabPanel value="2">  {rentListings && rentListings.length > 0 && (
                    <div className=''>
                        <div className='my-3'>
                            <h2 className='text-2xl font-semibold lg:font-bold text-gradient'>Recent places for rent ({rentListings.length})</h2>
                           
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {rentListings.map((listing) => (
                                <DashListingItem listing={listing} key={listing._id} />
                            ))}
                        </div>
                    </div>
                )}</TabPanel>
        <TabPanel value="3"> {saleListings && saleListings.length > 0 && (
                    <div className=''>
                        <div className='my-3'>
                            <h2 className='text-2xl font-semibold lg:font-bold text-gradient'>Recent places for sale ({saleListings.length})</h2>
                          
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {saleListings.map((listing) => (
                                <DashListingItem listing={listing} key={listing._id} />
                            ))}
                        </div>
                    </div>
                )}</TabPanel>
        </div>
      </TabContext>
    </Box>
            
               
              
               
            
        </>
    )
}
