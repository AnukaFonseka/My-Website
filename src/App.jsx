import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/common/Navbar'
import Hero from './components/Home/Hero'
import Skills from './components/Home/Skills'
import AboutMe from './components/Home/AboutMe'
import Projects from './components/Home/Projects'
import Experience from './components/Home/Experience'
import Footer from './components/Home/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Hero/>
      <Skills/>
      <AboutMe/>
      <Projects/>
      <Experience />
      <Footer />
      <Analytics />
    </>
  )
}

export default App
