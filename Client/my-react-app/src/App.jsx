
import React from 'react'
import Signup from './Signup'
import Login from './Login'
import UI from './UI'
import { Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <div>
     <Routes>
        <Route path ='/' element={<Signup/>}/>
        <Route path ='/login' element={<Login/>}/>
         <Route path ='/UI' element={<UI/>}/>
        {/* <Route path='users' element={<UI/>}/> */}
   </Routes>
     


    </div>
  )
}

export default App