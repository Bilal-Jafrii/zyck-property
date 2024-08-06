import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
export default function DashEmails() {
  const [emails,setEmails] = useState([])
  useEffect(()=>{
   try {
     const fetchEmails = async () => {
       const res = await fetch(`/api/news/emails`)
       const data = await res.json()
      
      setEmails(data)
     
     }
    fetchEmails()
   } catch (error) {
    console.log(error.message)
   }
   
  },[])
  
  return (
    <div>
      <h1 className='px-5 py-2 text-3xl'>Total Emails({emails.length})</h1>
     
        <div className="overflow-x-auto w-[1000px]">
      <Table className='bg-transparent'>
        <Table.Head>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Subscribed At</Table.HeadCell>
         
          
        </Table.Head>
        <Table.Body className="divide-y">
          {emails.map((item) => (

        
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex   items-center justify-center">
              {item.email}
            </Table.Cell>
            <Table.Cell className='pl-60'>{new Date(item.createdAt).toLocaleDateString()}</Table.Cell>
           
          </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
     
    </div>
  )
}
