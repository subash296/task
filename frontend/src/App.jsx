import React, { useEffect, useState } from 'react'
import { FaTrashCan } from "react-icons/fa6";
import { Routes,Route,Link } from 'react-router-dom';
import Items from './components/Items';
import BillDetail from './components/BillDetail';



function App() {
  return(
    <Routes>
      <Route path="/" element={<BillDetail />} />
      <Route path="/item" element={<Items />} />
  </Routes>
  )
  
 

}

export default App