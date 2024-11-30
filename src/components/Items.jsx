import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { FaTrashCan } from "react-icons/fa6";


function Items() {



  const [itemDetails, setitemDetails] = useState(()=>{
    const savedItemDetails = localStorage.getItem('itemDetails');
    return savedItemDetails ? JSON.parse(savedItemDetails) : [
      {
        item: "",
        quantity: "",
        rate: "",
        amount: "",
      }

    ]
  })
   


  useEffect(()=>{
    const datas=localStorage.getItem('itemDetails')
    setitemDetails(JSON.parse(datas))
  },[])
  useEffect(() => {
    localStorage.setItem('itemDetails', JSON.stringify(itemDetails));
  }, [itemDetails]);
  const handleChange = (e, index) => {
    const updateditemDetails = [...itemDetails]; 
    updateditemDetails[index] = {
      ...updateditemDetails[index],
      [e.target.name]: e.target.value, 
    };
    if(updateditemDetails[index].quantity && updateditemDetails[index].rate){
      updateditemDetails[index].amount=updateditemDetails[index].quantity*updateditemDetails[index].rate
      
      
    }
    setitemDetails(updateditemDetails); 
  };
  

  const addNew = () => {
    setitemDetails([
      ...itemDetails,
      {
        item: "",
        quantity: "",
        rate: "",
        amount: "",
      },
    ]);
  };
  const handleDelete=(index)=>{
    const afterDelete=itemDetails.filter((data,i)=>i !==index)
    setitemDetails(afterDelete)
  }
  let totalAmount=0
if(itemDetails && itemDetails.length){
 totalAmount = itemDetails.reduce((total, item) => {
    return total + item.amount || 0;
  }, 0)
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
              Item
            </th>
            <th className='border border-black px-8 py-3' >
              Qty
            </th>
            <th className='border border-black px-8 py-3' >
              Rate
            </th>
            <th className='border border-black px-8 py-3' >
              Amount
            </th>
           
          </tr>
      </thead>
      <tbody>
      
        {
          itemDetails.map((item,index)=>(
            <tr key={index}>
              <td className='border border-black px-8 py-3'><button className='text-2xl text-white bg-red-500 p-3' onClick={(()=>handleDelete(index))}><FaTrashCan /></button></td>
              <td className='border border-black px-8 py-3'><input name='item' className='h-full w-full border-none outline-none' type="text" value={item.item} onChange={(e)=>handleChange(e,index)} /></td>
              <td className='border border-black px-8 py-3'><input name='quantity' className='h-full w-full border-none outline-none' type="number" value={item.quantity} onChange={(e)=>handleChange(e,index)} /></td>
              <td className='border border-black px-8 py-3'><input name='rate' className='h-full w-full border-none outline-none' type="text" value={item.rate} onChange={(e)=>handleChange(e,index)} /></td>
              <td className='border border-black px-8 py-3'><p name='amount' className='h-full w-full border-none outline-none' ></p>{item.amount}</td>


              </tr>
            
          ))
        }
        <tr>
        <td className='border border-black px-8 py-3 text-right' colSpan="4">Total Amount</td>
        <td className='border border-black px-8 py-3'>{totalAmount}</td>
        </tr>
        
       
      </tbody>
    </table>
    <div className='flex justify-center max-w-7xl'>
    <Link to="/" className='text-xl w-full text-right px-6 mt-10 hover:underline hover:text-blue-600 '>Bill Page</Link>

    </div>
   
    
    </>
  )
}

export default Items