import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
{/*
import { SkillsHero } from './components/SkillsHero'
import { SkillsGrid } from './components/SkillsGrid'
*/}
export function SkillsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/*
        <SkillsHero />
        <SkillsGrid />
        */}
      </main>
      
      <Footer />
    </div>
  )
}
