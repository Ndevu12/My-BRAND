import React from "react";
import Link from "next/link";
import DashboardLayout from "@/features/dashboard/dashboardLayout/DashboardLayout";
import DashboardCard from "@/features/dashboard/dashboardLayout/components/DashboardCard";
import { UserIcon, FaProjectDiagram } from "../../components/atoms/Icon";

const dashboardLinks = [
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/projects", label: "Projects" },
  { href: "/dashboard/settings", label: "Settings" },
  { href: "/dashboard/feedback", label: "Feedback" },
];

export default function DashboardHomePage() {
  // Date for analytics header
  const now = new Date();
  const dateString = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Dummy recent blogs
  const recentBlogs = [
    {
      title: "How to Build a Dashboard",
      author: "Admin",
      date: "Jul 28, 2025",
      views: 1200,
    },
    {
      title: "Next.js Best Practices",
      author: "Jane Doe",
      date: "Jul 25, 2025",
      views: 950,
    },
    {
      title: "Tailwind CSS Tips",
      author: "John Smith",
      date: "Jul 20, 2025",
      views: 800,
    },
  ];

  return (
    <DashboardLayout>
      <main className="p-0 md:p-6 bg-gradient-to-b from-primary to-black/90 min-h-screen text-white font-roboto">
        {/* Analytics header with date and actions */}
        <section className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Analytics Overview</h2>
            <p className="text-gray-400">{dateString}</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <button className="bg-secondary px-4 py-2 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-all text-sm flex items-center">
              <i className="fas fa-download mr-2"></i> Export Report
            </button>
            <Link href="/dashboard/blogs/newBlog">
              <button className="bg-yellow-500 px-4 py-2 rounded-lg text-gray-900 font-medium hover:bg-yellow-400 transition-colors text-sm flex items-center">
                <i className="fas fa-plus mr-2"></i> New Article
              </button>
            </Link>
          </div>
        </section>

        {/* Stats overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Articles"
            icon={<i className="fas fa-newspaper"></i>}
            count={24}
            accentColor="text-blue-500"
          />
          <DashboardCard
            title="Projects"
            icon={<FaProjectDiagram />}
            count={12}
            accentColor="text-purple-500"
          />
          <DashboardCard
            title="Subscribers"
            icon={<i className="fas fa-users"></i>}
            count={320}
            accentColor="text-green-500"
          />
          <DashboardCard
            title="Profile Views"
            icon={<UserIcon />}
            count={102}
            accentColor="text-yellow-500"
          />
        </section>

        {/* Data visualization and recent activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart section */}
          <div className="bg-secondary rounded-xl shadow-lg p-6 border border-gray-700 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Traffic Overview</h2>
              <div className="flex space-x-2">
                {/* Add chart controls if needed */}
              </div>
            </div>
            <div className="h-80 flex items-center justify-center">
              {/* Chart.js integration placeholder */}
              <span className="text-gray-400 text-sm">[Chart coming soon]</span>
            </div>
          </div>
          {/* Activity timeline */}
          <div className="bg-secondary rounded-xl shadow-lg p-6 border border-gray-700">
            <h2 className="text-lg font-bold mb-6">Recent Activity</h2>
            <div className="space-y-6">
              <div className="flex justify-between text-gray-300">
                <span>Logged in</span>
                <span className="text-xs text-gray-400">2 min ago</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Updated profile</span>
                <span className="text-xs text-gray-400">10 min ago</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Created new project</span>
                <span className="text-xs text-gray-400">1 hour ago</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Published new blog</span>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
            </div>
          </div>
        </section>

        {/* Recent blogs with actions */}
        <section className="bg-secondary rounded-xl shadow-lg p-6 border border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Recent Blogs</h2>
            <Link
              href="/dashboard/all_articles"
              className="text-yellow-400 hover:underline text-sm flex items-center"
            >
              View All
              <i className="fas fa-arrow-right ml-1"></i>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-400">
                    Title
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-400">
                    Author
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-400">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-400">
                    Views
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {recentBlogs.map((blog, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-800/40 transition-colors"
                  >
                    <td className="px-4 py-2 text-sm text-white font-medium">
                      {blog.title}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-300">
                      {blog.author}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-400">
                      {blog.date}
                    </td>
                    <td className="px-4 py-2 text-sm text-yellow-400 font-bold">
                      {blog.views}
                    </td>
                    <td className="px-4 py-2 text-sm flex gap-2">
                      <Link href="#" className="text-blue-400 hover:underline">
                        View
                      </Link>
                      <Link
                        href="#"
                        className="text-yellow-400 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}
