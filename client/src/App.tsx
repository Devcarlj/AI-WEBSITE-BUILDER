import { Route } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Pricing from './pages/Pricing'
import Community from './pages/Community'
import { Routes, useLocation } from 'react-router-dom'
import Preview from './pages/Preview'
import MyProjects from './pages/MyProjects'
import View from './pages/View'
import NavBar from './components/NavBar'

const App = () => {

  const {pathname} = useLocation()
  const hideNavbar = pathname.startsWith('/projects') && pathname !== '/projects' || pathname.startsWith('view') || pathname.startsWith('preview')



  return (
    <div>

      {!hideNavbar && <NavBar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:projectId" element={<Projects />} />
        <Route path="/projects/" element={<MyProjects />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/community" element={<Community />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/preview/:projectId/:versionId" element={<Preview />} />
         <Route path="/view/" element={<View />} />
        
          
      </Routes>
    </div>
  )
}

export default App
