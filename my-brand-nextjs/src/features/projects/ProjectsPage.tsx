import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { ProjectsHero } from './components/ProjectsHero'
{/* 
import { ProjectsGrid } from './components/ProjectsGrid'
*/}
export function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-16">
        <ProjectsHero />
        {/* <ProjectsGrid /> */}
      </main>
      
      <Footer />
    </div>
  )
}
