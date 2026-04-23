import { lazy, Suspense, useState } from 'react'
import Navbar from './components/Navbar'
import Placeholder from './components/Placeholder/Placeholder'
import Heros from './components/Home/Heros'
import ScrollToTop from './components/ScrollToTop'
const About      = lazy(() => import('./components/About/About'))
const MySkills   = lazy(() => import('./components/MySkills/MySkills'))
const Projects   = lazy(() => import('./components/Projects/Projects'))
const Experience = lazy(() => import('./components/Experience/Experience'))
const Contacts   = lazy(() => import('./components/Contacts/Contacts'))
const Footer     = lazy(() => import('./components/Footer/Footer'))

function App() {
  const [done, setDone] = useState(false)

  return (
    <>
      {!done && <Placeholder onComplete={() => setDone(true)} />}
      <div className='min-h-screen bg-[#080810]'>
        <Navbar />
        <Heros isReady={done} />
        <Suspense fallback={null}>
          <About />
          <MySkills />
          <Projects />
          <Experience />
          <Contacts />
          <Footer />
        </Suspense>
      </div>
     <ScrollToTop />
    </>
  )
}

export default App
