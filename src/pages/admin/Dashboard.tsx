import React, { useState, useEffect } from "react";
import GalleryAlbumManager from "./GalleryAlbumManager";
import NewsManager from "./NewsManager";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { LanguageProvider } from "../../context/LanguageContext"; // <-- import this

const Dashboard = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);
  const [galleryKey, setGalleryKey] = useState(0);
  const [newsKey, setNewsKey] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("supabase.auth.token");
    if (!token) {
      window.location.href = "/admin/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("supabase.auth.token");
    window.location.href = "/";
  };

  // Handler for expanding gallery
  const handleExpandGallery = () => {
    if (!showGallery) {
      setGalleryLoading(true);
      setGalleryKey(prev => prev + 1); // force remount
      setTimeout(() => setGalleryLoading(false), 800); // fallback in case fetch is fast
    }
    setShowGallery(v => !v);
  };

  // Handler for expanding news
  const handleExpandNews = () => {
    if (!showNews) {
      setNewsLoading(true);
      setNewsKey(prev => prev + 1); // force remount
      setTimeout(() => setNewsLoading(false), 800);
    }
    setShowNews(v => !v);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="w-full bg-white shadow py-4 px-8 flex items-center justify-end my-20">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout ↪
          </button>
        </div>
        <main className="flex-1 p-4 w-full max-w-6xl mx-auto">
          {/* Gallery Section */}
          <section className="mt-0 mb-4 bg-white rounded shadow">
            <button
              className="w-full text-left px-4 py-2 font-semibold text-lg border-b flex items-center justify-between focus:outline-none"
              onClick={handleExpandGallery}
            >
              Manage Gallery Albums
              <span>{showGallery ? "▲" : "▼"}</span>
            </button>
            {showGallery && (
              <div className="p-3">
                {galleryLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <span className="loader border-4 border-blue-200 border-t-blue-600 rounded-full w-8 h-8 animate-spin inline-block"></span>
                  </div>
                ) : (
                  <GalleryAlbumManager key={galleryKey} />
                )}
              </div>
            )}
          </section>
          {/* News Section */}
          <section className="mb-4 bg-white rounded shadow">
            <button
              className="w-full text-left px-4 py-2 font-semibold text-lg border-b flex items-center justify-between focus:outline-none"
              onClick={handleExpandNews}
            >
              Manage News
              <span>{showNews ? "▲" : "▼"}</span>
            </button>
            {showNews && (
              <div className="p-3">
                {newsLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <span className="loader border-4 border-blue-200 border-t-blue-600 rounded-full w-8 h-8 animate-spin inline-block"></span>
                  </div>
                ) : (
                  <NewsManager key={newsKey} />
                )}
              </div>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Dashboard;