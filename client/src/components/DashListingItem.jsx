import { Link, useNavigate } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
export default function DashListingItem({ listing }) {
    const [userListings, setUserListings] = useState([]);
    const navigate = useNavigate()
    const handleListingDelete = async (listingId) => {
        try {
          const res = await fetch(`/api/listing/delete/${listingId}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          setTimeout(() => {
              navigate(0)
          }, 2000);
          toast.success("Listing Deleted Succesfully !")
          if (data.success === false) {
            console.log(data.message);
            return;
          }
    
          setUserListings((prev) =>
            prev.filter((listing) => listing._id !== listingId)
          );
        } catch (error) {
            toast.error(error.message)
          console.log(error.message);
        }
      };
  return (
    <>
    <Toaster/>
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            Rs
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
      <div className='w-[100%] my-5'>
      <Link to={`/update-listing/${listing._id}`}>   <button className='bg-green-600 p-4 w-[45%] rounded-lg mx-3 font-bold text-white'>Edit</button></Link> 
        <button onClick={() => handleListingDelete(listing._id)} className='bg-red-500 p-4 w-[45%] rounded-lg text-white font-bold'>Delete</button>
      </div>
    </div>
    </>
  );
}
