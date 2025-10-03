proper tailwind setup - v3
> https://v3.tailwindcss.com/

usestate
>


map should have a key
~~~javascript
{recentJobs.map((job) => (
                <Joblisting key={job.id} job={job}/>
          ))}
~~~

react-icon library
>$ npm install react-icons
~~~javascript
<FaMapMarker className='inline text-lg mr-2 mb-1'/>
~~~


What is the Difference Between SPAs, SSGs, and SSR?
SPA - 
>SPA (Single Page App): React app that loads one HTML file, then JS swaps components. (CRA example)

>SSG (Static Site Generation): HTML is pre-built at build time. (Next.js getStaticProps, Gatsby)

>SSR (Server-Side Rendering): HTML is generated on each request by the server. (Next.js getServerSideProps)

In SPA (react app in our acse), clicking a “page” link -> component swap, no reload.
React Router used here to maps URLs -> components.

“reload” means in Normal websites (MPA – multi-page apps) reload the entire HTML page from the server when you click a link.

> <Outlet />
It tells React Router: “Render the child route components here.”

proxy
Instead of hitting http://localhost:8000/jobs directly, you can set up a proxy so React pretends the backend is on the same domain.

proxy config on CRA vs vite:
CRA has a built-in proxy field in package.json.
>"proxy": "http://localhost:8000"

Vite you configure it in vite.config.js under the server.proxy option.
>proxy: {
  '/api': {                     // if I call /api in my frontend
    target: 'http://localhost:8000',  // actually send it to json-server
    changeOrigin: true,          // make host header match target
    rewrite: (path) => path.replace(/^\/api/, '') // strip "/api" before forwarding
  }
}

for frontend fetch
>fetch('/api/jobs')

then servercaches it and passes it to 
>http://localhost:8000/jobs

cross-origin request
sending req accross different origins

The frontend sends a request to /api/..., and the Vite proxy forwards it to http://localhost:8000/..., removing /api and changing the origin so the backend accepts it.

data fetching more easire way:
suspence
react query
SWR

useParams from React Router and lets you read URL parameters from the route.
~~~javascript
<Route path="/jobs/:id" element={<JobDetails />} />

import { useParams } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams(); // grabs the :id from the URL
  // Now you can use it in your API call:
  fetch(`http://localhost:8000/jobs/${id}`)
}
~~~

2 ways to load the data:
using usestate, useeffect

~~~javascript
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinners from '../components/Spinners'

const JobPage = () => {
    const {id} = useParams()
    const [job, setjob] = useState(null)
    const [loading, setloading] = useState(true)

    useEffect(()=>{
        const fetchjobs = async ()=> {
        try {
          const res = await fetch(`/api/jobs/${id}`)
          const data = await res.json()
          setjob(data)
        } catch (error) {
          console.log('error fetching..', error);
        } finally {
          setloading(false)
        }
      }
        fetchjobs()
      }, [])
  return loading? <Spinners /> : (
    <h1>{job.title}</h1>
  )
};

export default JobPage;
~~~

using react data loaders:
  ~~~javascript
  import { useParams, useLoaderData } from 'react-router-dom'
  const job = useLoaderData()

<h1 className="text-3xl font-bold mb-4">
  {job.title}
</h1>
  ~~~

  Working with forms:
  1.refs or fornic
  2. most common way is using usestate

2.=>
~~~javascript
const [title, setTitle] = useState(job.title);
const [type, setType] = useState(job.type);
...

const formSubmit = (e)=>{
            e.preventDefault()
    
            const updatedJob = {
                id,
                title,
                ...
~~~

DELETE:
~~~Javascript
const deletejob = async (jobId) => {
const res = await fetch(`/api/jobs/${jobId}`,
  {
      method: 'DELETE',
    }
  )
  return
  }
~~~

Update:
~~~Javascript
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
~~~
then passing it as a prop

~~~javascript
<Route path='/edit-job/:id' element={***<EditJobPage updatejob={updatejob}/>***} loader={jobLoader}/>
~~~

then calling it with updated data 
~~~javascript
updatejob(updatedJob);
~~~

Other imps:
  ~~~javascript
  const confirm = window.confirm('Are you sure you want to delete this listings?')
  ~~~
  toastify:
  ~~~javascript
    // import
    import { ToastContainer } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css'
    ...
    // Use the ToastContainer once in the root component
    <ToastContainer />
  
    // import toast in the child component 
    import { toast } from 'react-toastify';
    // then, Trigger a toast notification
    toast.success('Jobdeleted successfully!')
  ~~~
  
  ~~~javascript
      const confirmDelete = async (id) => {
      if (window.confirm('Are you sure you want to delete this listing?')) {
        await deleteJob(id);
        toast.success('Job deleted successfully!');
      }
    }
  ~~~

  proxy:
  its just like setting up a variable we set up our backend  and initialize it as /api so if we deploy we dont need to change every file but this way its just one time and it also shut down errors like cross-origin request
  ~~~javascript
  proxy:{
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  ~~~

  spinners:
  ~~~javascript
  // import
  import Spinners from './Spinners'
  // then load it as a component
  {loading ? ( ***<Spinners loading={loading} />***) : event()}
  ~~~

  useNavigate:
  ~~~javascript
  // import
  import { useNavigate } from 'react-router-dom';
  // initialize
  const navigate = useNavigate()
  // call it 
  return navigate('/jobs')
  // or 
  const handleClick = () => navigate('/jobs');
  ~~~