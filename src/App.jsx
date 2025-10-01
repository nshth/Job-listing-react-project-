import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import  Hero  from './components/Hero'
import  Homecard  from './components/Homecard'
import Joblistings from './components/Joblistings'
import ViewAllJobs from './components/ViewAllJobs'

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Homecard />
      <Joblistings />
      <ViewAllJobs />
    </>
  )
}

export default App