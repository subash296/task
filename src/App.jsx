import React,{useState,useEffect} from 'react'
import { FaTrashCan } from "react-icons/fa6";


function App() {
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
      const handleBillChange = (e, index) => {
        const updatedBillDetails = [...billDetails]; 
        updatedBillDetails[index] = {
          ...updatedBillDetails[index],
          [e.target.name]: e.target.value, 
        };
        setBillDetails(updatedBillDetails); 
      };
    
      const addNewBill = () => {
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
  
      const handleBillDelete=(index)=>{
  
        if(index===0 && billDetails.length===1){

          setBillDetails([
            {
              billNo: '',
              billDate: '',
              customer: '',
              contact: '',
              address: '',
            },
          ]);
          

          
        }
        
        const afterDelete=billDetails.filter((data,i)=>i !==index)
        setBillDetails(afterDelete)
      }

      // itemDetails


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
      const handleItemChange = (e, index) => {
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
      
    
      const addNewItem = () => {
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
      const handleItemDelete=(index)=>{
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
        <div className='flex max-w-7xl justify-end m-5 ml-24'>
       
                 <div className='flex gap-5 justify-center items-center'>
                 <button className='text-3xl bg-green-400 text-white px-3 py-2' onClick={addNewBill}>+</button>
                 <p className='text-xl text-black '>New Bill</p>
                 </div>
                

        </div>
        {
          billDetails.length ===0 &&
          (
            <div>
            <h1 className='text-2xl flex justify-center mt-44 h-screen'>No Bill Found!!!</h1>
            </div>
          )
        }
         {
          billDetails.length !==0 &&
              billDetails?.map((item,index)=>(<>
        <table className='p-5 mt-10 mx-auto' key={index}>
          <thead>
              <tr className='border border-black border-collapse'>
                <th className="border border-black px-8 py-3">Sl.no</th>
                <th className="border border-black px-8 py-3"></th>

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
          
           
             
                <tr >
                  <td className='border border-black px-8 py-3'>{index+1}</td>
                  <td className='border border-black px-8 py-3'><button className='text-2xl text-white bg-red-500 p-3' onClick={(()=>handleBillDelete(index))}><FaTrashCan /></button></td>
                  <td className='border border-black px-8 py-3'><input name='billNo' className='h-full w-full border-none outline-none text-black text-xl' type="text" value={item.billNo} onChange={(e)=>handleBillChange(e,index)} /></td>
                  <td className='border border-black px-8 py-3'><input name='billDate' className='h-full w-full border-none outline-none' type="text" value={item.billDate} onChange={(e)=>handleBillChange(e,index)} /></td>
                  <td className='border border-black px-8 py-3'><input name='customer' className='h-full w-full border-none outline-none' type="text" value={item.customer} onChange={(e)=>handleBillChange(e,index)} /></td>
                  <td className='border border-black px-8 py-3'><input name='contact' className='h-full w-full border-none outline-none' type="text" value={item.contact} onChange={(e)=>handleBillChange(e,index)} /></td>
                  <td className='border border-black px-8 py-3'><input name='address' className='h-full w-full border-none outline-none' type="text" value={item.address} onChange={(e)=>handleBillChange(e,index)} /></td>
    
    
                  </tr>

  
          </tbody>

        </table>

         <table className='p-5 mt-1 mx-auto mb-10'>
            <thead>
              <tr className='border border-black border-collapse'>
                  <th className='border border-black px-8 py-3'>Sl.no</th>
                  <th className='border border-black px-8 py-3 '>
                    <button className='text-3xl bg-green-400 text-white px-3 py-2 ' onClick={addNewItem}>+</button>
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
                       <td className='border border-black px-8 py-3'>{index+1}</td>
                      <td className='border border-black px-8 py-3'><button className='text-2xl text-white bg-red-500 p-3' onClick={(()=>handleItemDelete(index))}><FaTrashCan /></button></td>
                      <td className='border border-black px-8 py-3'><input name='item' className='h-full w-full border-none outline-none' type="text" value={item.item} onChange={(e)=>handleItemChange(e,index)} /></td>
                      <td className='border border-black px-8 py-3'><input name='quantity' className='h-full w-full border-none outline-none' type="number" value={item.quantity} onChange={(e)=>handleItemChange(e,index)} /></td>
                      <td className='border border-black px-8 py-3'><input name='rate' className='h-full w-full border-none outline-none' type="text" value={item.rate} onChange={(e)=>handleItemChange(e,index)} /></td>
                      <td className='border border-black px-8 py-3'><p name='amount' className='h-full w-full border-none outline-none' ></p>{item.amount}</td>


                    </tr>
                    
                ))
              }
              {
                itemDetails.length>0 &&(

              
                  <tr>
                      <td className='border border-black px-8 py-3 text-right' colSpan="5">Total Amount</td>
                      <td className='border border-black px-8 py-3'>{totalAmount}</td>
                  </tr>
                    )
                  }
            </tbody>

         </table>     
         </>      
           ))
            }
       
   


      
    
         
        </>
      )
}

export default App