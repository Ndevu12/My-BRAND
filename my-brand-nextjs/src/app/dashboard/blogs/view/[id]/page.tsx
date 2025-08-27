"use client";

import React from "react";
import { AdminBlogDetail } from "@/features/dashboard/blogs/blogDetail";

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = React.use(params);

  return <AdminBlogDetail blogId={resolvedParams.id} />;
}
