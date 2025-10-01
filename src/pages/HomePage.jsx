import React from 'react'
import Hero from '../components/Hero'
import HomeCard from '../components/Homecard'
import Joblistings from '../components/Joblistings'
import ViewAllJobs from '../components/ViewAllJobs'

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCard />
      <Joblistings isHome={true} />
      <ViewAllJobs />
    </>
  )
}

export default HomePage