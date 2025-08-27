import React from "react";
import NewBlog from "@/features/blog/newBlog/NewBlog";

const NewBlogPage: React.FC = () => {
  return (
    <div className="p-6 flex-grow overflow-y-auto bg-gradient-to-b from-primary to-black/90">
      <NewBlog />
    </div>
  );
};

export default NewBlogPage;
