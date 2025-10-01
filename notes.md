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
>The server generates HTML on every request. You don’t just serve a static index.html  the server builds the page with data, sends full HTML to the browser. Example: Next.js with getServerSideProps.
SSR -
>HTML is pre-built at build time, not per request. Works great for mostly static content (blogs, docs). Example: Next.js with getStaticProps, Gatsby sites.

In SPA (react app in our acse), clicking a “page” link -> component swap, no reload.
React Router used here to maps URLs -> components.

“reload” means in Normal websites (MPA – multi-page apps) reload the entire HTML page from the server when you click a link.