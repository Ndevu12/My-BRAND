"use client";

import React, { use } from "react";
import NewBlog from "@/features/dashboard/blogs/newBlog/NewBlog";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

const EditBlogPage: React.FC<EditBlogPageProps> = ({ params }) => {
  const { id } = use(params);

  return (
    <div className="p-6 flex-grow overflow-y-auto bg-gradient-to-b from-primary to-black/90">
      <NewBlog blogId={id} />
    </div>
  );
};

export default EditBlogPage;
