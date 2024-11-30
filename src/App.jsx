import React  from 'react'

import { Routes,Route } from 'react-router-dom';
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