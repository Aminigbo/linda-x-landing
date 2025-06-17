/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import About from "./pages/About";
import ContactMe from "./pages/ContactMe";
import Articles from "./pages/Articles";
import NewsEvents from "./pages/NewsEvents";
import Book from "./pages/Books";
import StoryPopup from "./pages/Story";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import AllStories from "./pages/AllStories";
import FullArticle from "./pages/FullArticle";
import ArticlesUpload from "./pages/ArticlesUpload";
import AllArticles from "./pages/AllArticles";
import MyPage from "./pages/text";


function App() {
  // Scroll to top on route change using a custom component
  // This component listens to the location changes and scrolls to the top
  // when the pathname changes, ensuring a smooth user experience

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <Router>
      {/* <ScrollToTop /> */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<MyPage />} />
        <Route path="/story/:id" element={<StoryPopup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactMe />} />
        <Route path="/events" element={<NewsEvents />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<FullArticle />} />
        <Route path="/book/:bookId" element={<Book />} />
        <Route path="/login" element={<Login />} />
        <Route path="/uploads" element={<Upload />} />
        <Route path="/all-stories" element={<AllStories />} />
        <Route path="/all-articles" element={<AllArticles />} />
        <Route path="/articles-upload" element={<ArticlesUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
