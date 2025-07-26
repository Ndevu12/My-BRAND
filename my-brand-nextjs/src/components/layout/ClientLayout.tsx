"use client";

import React from "react";
import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";
import ScrollToTopButton from "../atoms/ScrollToTopButton";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default ClientLayout;
