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
>You do have an HTML file, React loads in that HTML and dynamically updates content via JS. Example: a normal React app build with create-react-app.
SSG - 
>The server generates HTML on every request. You don’t just serve a static index  the server builds the page with data, sends full HTML to the browser. Example: Next.js with getServerSideProps.
SSR -
>HTML is pre-built at build time, not per request. Works great for mostly static content (blogs, docs). Example: Next.js with getStaticProps, Gatsby sites.

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
  