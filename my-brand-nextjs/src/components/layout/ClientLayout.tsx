"use client";

import React from "react";
import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
      {children}
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;