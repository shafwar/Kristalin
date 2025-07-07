import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NewsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-24 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 text-center">News</h1>
        <p className="text-lg text-gray-600 max-w-xl text-center mb-8">
          Stay tuned for the latest news and updates from PT Kristalin Eka Lestari. This page will feature company announcements, project milestones, and industry insights.
        </p>
        <div className="text-gray-400 italic">(No news articles yet. Please check back soon!)</div>
      </main>
      <Footer />
    </div>
  );
} 