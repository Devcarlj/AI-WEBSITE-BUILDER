import { Loader2, MessageSquare, X } from "lucide-react" // Cleaned up "Icon" suffix
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { dummyConversations, dummyProjects } from "../assets/assets"
import type { Project } from "../types"

const Projects = () => {
  const { projectId } = useParams();
  const navigate = useNavigate()

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(true)
  const [device, setDevice] = useState<'phone' | 'tablet' | 'desktop'>("desktop")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const fetchProject = async () => {
    // Using loose equality (==) to prevent string vs number mismatch bugs
    const foundProject = dummyProjects.find(proj => proj.id == projectId)
    
    setTimeout(() => {
      if (foundProject) {
        setProject({ ...foundProject, conversation: dummyConversations })
        setIsGenerating(foundProject.current_code ? false : true)
      }
      setLoading(false) // This kicks off the evaluation step below
    }, 2000)
  }

  useEffect(() => {
    fetchProject()
  }, [])

  // --- 1. FIRST GUARD CLAUSE: Handle Loading Screen ---
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <Loader2 className='size-7 animate-spin text-violet-200' />
      </div>
    )
  }

  // --- 2. SECOND GUARD CLAUSE: Handle Project Not Found Screen ---
  // This will ONLY run after loading is completely false
  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className='text-2xl font-medium text-gray-200'>
          Unable to load projects!
        </p>
      </div>
    )
  }

  // --- 3. THE BASE UI: Guarantees that `project` is not null ---
  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white">
      {/* builder nav bar */}
      <div className="flex max-sm:flex-col sm:items-center justify-between gap-4 px-4 py-3 border-b border-gray-800 no-scrollbar">
        
        {/* left panel */}
        <div className="flex items-center gap-2 sm:min-w-[360px] text-nowrap">
          <img 
            src="/favicon.svg" 
            alt="logo" 
            className="h-6 cursor-pointer"
            onClick={() => navigate('/')} 
          />
          <div className="max-w-64 sm:max-w-xs">
            <p className="text-sm font-medium capitalize truncate">{project.name}</p>
            <p className="text-xs text-gray-400 -mt-0.5">Previewing last version</p>
          </div>
          <div className="sm:hidden flex-1 flex justify-end">
            {isMenuOpen ? (
              <X onClick={() => setIsMenuOpen(false)} className='size-7 cursor-pointer' />
            ) : (
              <MessageSquare onClick={() => setIsMenuOpen(true)} className='size-7 cursor-pointer' />
            )}
          </div>
        </div>

        {/* middle panel */}
        <div></div>

        {/* right panel */}
        <div></div>

      </div>
    </div>
  )
}

export default Projects