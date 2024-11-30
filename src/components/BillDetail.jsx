import React,{useState,useEffect} from 'react'
import { FaTrashCan } from "react-icons/fa6";
import {Link } from 'react-router-dom';
import Items from './Items';

function BillDetail() {
    const [billDetails, setBillDetails] = useState(() => {
        const savedBillDetails = localStorage.getItem('billDetails');
        return savedBillDetails ? JSON.parse(savedBillDetails) : [
          {
            billNo: "",
            billDate: "",
            customer: "",
            contact: "",
            address: "",
          },
        ]; 
      });
    
      
      useEffect(() => {
        localStorage.setItem('billDetails', JSON.stringify(billDetails));
      }, [billDetails]);
      const handleChange = (e, index) => {
        const updatedBillDetails = [...billDetails]; 
        updatedBillDetails[index] = {
          ...updatedBillDetails[index],
          [e.target.name]: e.target.value, 
        };
        setBillDetails(updatedBillDetails); 
      };
    
      const addNew = () => {
        setBillDetails([
          ...billDetails,
          {
            billNo: '',
            billDate: '',
            customer: '',
            contact: '',
            address: '',
          },
        ]);
      };
      const handleDelete=(index)=>{
        
        const afterDelete=billDetails.filter((data,i)=>i !==index)
        setBillDetails(afterDelete)
      }
    
    
    
    
      return (
        <>
        <table className='mx-auto  p-5 mt-7'>
          <thead>
              <tr className='border border-black border-collapse'>
                <th className='border border-black px-8 py-3'>
                  <button className='text-3xl bg-green-400 text-white px-3 py-2' onClick={addNew}>+</button>
                </th>
                <th className='border border-black px-8 py-3' >
                  Bill No
                </th>
                <th className='border border-black px-8 py-3' >
                  Bill Date
                </th>
                <th className='border border-black px-8 py-3' >
                  Customer
                </th>
                <th className='border border-black px-8 py-3' >
                  Contact
                </th>
                <th className='border border-black px-8 py-3' >
                  Address
                </th>
              </tr>
          </thead>
          <tbody>
          
            {
              billDetails?.map((item,index)=>(
                <tr key={index}>
                  <td className='border border-black px-8 py-3'><button className='text-2xl text-white bg-red-500 p-3' onClick={(()=>handleDelete(index))}><FaTrashCan /></button></td>
                  <td className='border border-black px-8 py-3'><input name='billNo' className='h-full w-full border-none outline-none text-black text-xl' type="text" value={item.billNo} onChange={(e)=>handleChange(e,index)} /></td>
                  <td className='border border-black px-8 py-3'><input name='billDate' className='h-full w-full border-none outline-none' type="text" value={item.billDate} onChange={(e)=>handleChange(e,index)} /></td>
                  <td className='border border-black px-8 py-3'><input name='customer' className='h-full w-full border-none outline-none' type="text" value={item.customer} onChange={(e)=>handleChange(e,index)} /></td>
                  <td className='border border-black px-8 py-3'><input name='contact' className='h-full w-full border-none outline-none' type="text" value={item.contact} onChange={(e)=>handleChange(e,index)} /></td>
                  <td className='border border-black px-8 py-3'><input name='address' className='h-full w-full border-none outline-none' type="text" value={item.address} onChange={(e)=>handleChange(e,index)} /></td>
    
    
                  </tr>
                
              ))
            }
          </tbody>
        </table>
        <div className='flex justify-center max-w-7xl'>
            <Link to="/item" className='text-xl w-full text-right px-6 mt-10 hover:underline hover:text-blue-600 '>Items Page</Link>

        </div>
      
    
         
        </>
      )
}

export default BillDetail