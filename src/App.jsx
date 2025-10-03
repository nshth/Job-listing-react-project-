import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import JobPage, {jobLoader} from './pages/JobPage'
import AddJobsPage from './pages/AddJobsPage'
import EditJobPage from './pages/EditJobPage'
import MainLayout from './layouts/MainLayout'
import Notfound from './pages/Notfound'


const App = () => {
  // Add job
  const addjob = async (newjob)=>{
    const res = await fetch('/api/jobs',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newjob)
    }
  )
  return
  }

  // Delete job
  const deletejob = async (jobId) => {
const res = await fetch(`/api/jobs/${jobId}`,
  {
      method: 'DELETE',
    }
  )
  return
  }

  const updatejob = async (job)=>{
    const res = await fetch(`/api/jobs/${job.id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    })
  return
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MainLayout />} > 
      <Route index element={<HomePage />}/>
      <Route path='/jobs' element={<JobsPage />}/>
      <Route path='/edit-job/:id' element={<EditJobPage updatejob={updatejob}/>} loader={jobLoader}/>
      <Route path='/jobs/:id' element={<JobPage deletejob={deletejob}/>} loader={jobLoader}/>
      <Route path='/add-job' element={<AddJobsPage addjob={addjob}/>} />
      <Route path='*' element={<Notfound />}/>
    </Route>
  ));
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App