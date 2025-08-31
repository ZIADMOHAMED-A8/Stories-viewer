import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Storiesview from './Pages/Storiessection';
import Storiespage from './Pages/Storiespage';

function App() {
let router =createBrowserRouter([
  {
    path:'/',
    element:<Homepage></Homepage>
  },
  {
    path:'/stories/:id',
    element:<Storiespage></Storiespage>
  }
])
  return (
    
   <RouterProvider router={router}></RouterProvider>
  )
}

export default App
