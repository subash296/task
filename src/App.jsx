import React, { useState, useEffect,useRef } from 'react'
import {  FaTrashCan } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";


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
                itemDetails: [{
                    item: "",
                    quantity: "",
                    rate: "",
                    amount: "",
                }],
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
    const bottomRef = useRef(null);
    const topRef = useRef(null);

    const addNewBill = () => {
        setBillDetails([
            ...billDetails,
            {
                billNo: '',
                billDate: '',
                customer: '',
                contact: '',
                address: '',
                itemDetails: [{
                    item: "",
                    quantity: "",
                    rate: "",
                    amount: "",
                }],
            },
        ]);
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleBillDelete = (index) => {
        if (index === 0 && billDetails.length === 1) {
            setBillDetails([{
                billNo: '',
                billDate: '',
                customer: '',
                contact: '',
                address: '',
                itemDetails: [{
                    item: "",
                    quantity: "",
                    rate: "",
                    amount: "",
                }],
            }]);
        } else {
            const afterDelete = billDetails.filter((_, i) => i !== index);
            setBillDetails(afterDelete);
        }
    };

    const handleItemChange = (e, billIndex, itemIndex) => {
        const updatedBillDetails = [...billDetails];
        updatedBillDetails[billIndex].itemDetails[itemIndex] = {
            ...updatedBillDetails[billIndex].itemDetails[itemIndex],
            [e.target.name]: e.target.value,
        };

        if (updatedBillDetails[billIndex].itemDetails[itemIndex].quantity && updatedBillDetails[billIndex].itemDetails[itemIndex].rate) {
            updatedBillDetails[billIndex].itemDetails[itemIndex].amount = updatedBillDetails[billIndex].itemDetails[itemIndex].quantity * updatedBillDetails[billIndex].itemDetails[itemIndex].rate;
        }

        setBillDetails(updatedBillDetails);
    };

    const addNewItem = (billIndex) => {
        const updatedBillDetails = [...billDetails];
        updatedBillDetails[billIndex].itemDetails.push({
            item: "",
            quantity: "",
            rate: "",
            amount: "",
        });

        setBillDetails(updatedBillDetails);
    };

    const handleItemDelete = (billIndex, itemIndex) => {
        const updatedBillDetails = [...billDetails];
        updatedBillDetails[billIndex].itemDetails = updatedBillDetails[billIndex].itemDetails.filter((_, i) => i !== itemIndex);

        setBillDetails(updatedBillDetails);
    };

    return (
        <>
      
            <div className='flex max-w-7xl justify-end m-5 ml-24' ref={topRef}>
                <div className='flex gap-5 justify-center items-center'>
                    <button className='text-3xl bg-green-400 text-white px-3 py-2' onClick={addNewBill}>+</button>
                    <p className='text-xl text-black'>New Bill</p>
                </div>
            </div>


            {billDetails.length === 0 &&
                <div>
                    <h1 className='text-2xl flex justify-center mt-44 h-screen'>No Bill Found!!!</h1>
                </div>
            }

            {billDetails.length !== 0 &&
                billDetails.map((item, billIndex) => (
                    <div key={billIndex}>
                        <table className='p-5 mt-10 mx-auto'>
                            <thead>
                                <tr className='border border-black border-collapse'>
                                    <th className="border border-black px-8 py-3">Sl.no</th>
                                    <th className="border border-black px-8 py-3"></th>
                                    <th className='border border-black px-8 py-3'>Bill No</th>
                                    <th className='border border-black px-8 py-3'>Bill Date</th>
                                    <th className='border border-black px-8 py-3'>Customer</th>
                                    <th className='border border-black px-8 py-3'>Contact</th>
                                    <th className='border border-black px-8 py-3'>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='border border-black px-8 py-3'>{billIndex + 1}</td>
                                    <td className='border border-black px-8 py-3'>
                                        <button className='text-2xl text-white bg-red-500 p-3' onClick={() => handleBillDelete(billIndex)}>
                                            <FaTrashCan />
                                        </button>
                                    </td>
                                    <td className='border border-black px-8 py-3'>
                                        <input name='billNo' className='h-full w-full border-none outline-none text-black text-xl' type="text" value={item.billNo} onChange={(e) => handleBillChange(e, billIndex)} />
                                    </td>
                                    <td className='border border-black px-8 py-3'>
                                        <input name='billDate' className='h-full w-full border-none outline-none' type="text" value={item.billDate} onChange={(e) => handleBillChange(e, billIndex)} />
                                    </td>
                                    <td className='border border-black px-8 py-3'>
                                        <input name='customer' className='h-full w-full border-none outline-none' type="text" value={item.customer} onChange={(e) => handleBillChange(e, billIndex)} />
                                    </td>
                                    <td className='border border-black px-8 py-3'>
                                        <input name='contact' className='h-full w-full border-none outline-none' type="text" value={item.contact} onChange={(e) => handleBillChange(e, billIndex)} />
                                    </td>
                                    <td className='border border-black px-8 py-3'>
                                        <input name='address' className='h-full w-full border-none outline-none' type="text" value={item.address} onChange={(e) => handleBillChange(e, billIndex)} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table className='p-5 mt-1 mx-auto mb-10'>
                            <thead>
                                <tr className='border border-black border-collapse'>
                                    <th className='border border-black px-8 py-3'>Sl.no</th>
                                    <th className='border border-black px-8 py-3 '>
                                        <button className='text-3xl bg-green-400 text-white px-3 py-2 ' onClick={() => addNewItem(billIndex)}>+</button>
                                    </th>
                                    <th className='border border-black px-8 py-3'>Item</th>
                                    <th className='border border-black px-8 py-3'>Qty</th>
                                    <th className='border border-black px-8 py-3'>Rate</th>
                                    <th className='border border-black px-8 py-3'>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {item.itemDetails.map((itemDetail, itemIndex) => (
                                    <tr key={itemIndex}>
                                        <td className='border border-black px-8 py-3'>{itemIndex + 1}</td>
                                        <td className='border border-black px-8 py-3'>
                                            <button className='text-2xl text-white bg-red-500 p-3' onClick={() => handleItemDelete(billIndex, itemIndex)}>
                                                <FaTrashCan />
                                            </button>
                                        </td>
                                        <td className='border border-black px-8 py-3'>
                                            <input name='item' className='h-full w-full border-none outline-none' type="text" value={itemDetail.item} onChange={(e) => handleItemChange(e, billIndex, itemIndex)} />
                                        </td>
                                        <td className='border border-black px-8 py-3'>
                                            <input name='quantity' className='h-full w-full border-none outline-none' type="number" value={itemDetail.quantity} onChange={(e) => handleItemChange(e, billIndex, itemIndex)} />
                                        </td>
                                        <td className='border border-black px-8 py-3'>
                                            <input name='rate' className='h-full w-full border-none outline-none' type="text" value={itemDetail.rate} onChange={(e) => handleItemChange(e, billIndex, itemIndex)} />
                                        </td>
                                        <td className='border border-black px-8 py-3'>
                                            {itemDetail.amount}
                                        </td>
                                    </tr>
                                ))}

                                {item.itemDetails.length > 0 && (
                                    <tr>
                                        <td className='border border-black px-8 py-3 text-right' colSpan="5">Total Amount</td>
                                        <td className='border border-black px-8 py-3'>
                                            {item.itemDetails.reduce((total, itemDetail) => total + itemDetail.amount, 0)}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                ))}
                 <div ref={bottomRef}></div>
                 <div className='fixed bottom-10 right-7 z-20'>
        <p>
          <FaChevronUp
            className='text-5xl text-black bg-gray-300 p-4 rounded-full cursor-pointer'
            onClick={() => {
              topRef.current.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </p>
      </div>

        </>
    );
}

export default App;
