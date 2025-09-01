import React from "react";
import AllBlogs from "@/features/dashboard/blogs/allBlogs/AllBlogs";

export default function BlogsPage() {
  return (
    <div className="p-6 flex-grow overflow-y-auto bg-gradient-to-b from-primary to-black/90">
      <AllBlogs />
    </div>
  );
}
