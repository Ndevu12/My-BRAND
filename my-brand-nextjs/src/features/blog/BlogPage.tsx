import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'

export function BlogPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Blog Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Latest <span className="text-blue-600">Insights</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore my latest articles on web development, software engineering, 
            technology trends, and professional insights from the world of programming.
          </p>
        </section>

        {/* Coming Soon Section */}
        <section className="text-center py-20">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-12">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Blog Coming Soon
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              I'm currently working on bringing you amazing content about web development, 
              programming best practices, and technology insights. Stay tuned!
            </p>
            
            {/* Newsletter Signup Placeholder */}
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  Notify Me
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Get notified when the first article is published!
              </p>
            </div>
          </div>
        </section>

        {/* Featured Topics Preview */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            What to Expect
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚛️',
                title: 'React & Next.js',
                description: 'Advanced techniques, best practices, and real-world examples'
              },
              {
                icon: '🚀',
                title: 'Full-Stack Development',
                description: 'End-to-end development insights and architectural decisions'
              },
              {
                icon: '🛠️',
                title: 'Development Tools',
                description: 'Productivity tips, tool reviews, and workflow optimization'
              }
            ].map((topic, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h4>
                <p className="text-gray-600">{topic.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
