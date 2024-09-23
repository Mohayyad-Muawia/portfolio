import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/admin/Login";
import useFetch from "./components/useFetch";
import NotFound from "./components/404";
import Loading from "./components/Loading";
import Footer from "./components/Footer";

function App() {
  const [allProjects, setAllProjects] = useState([]); // Initialize state with an empty array
  const { data, loading, error } = useFetch(
    /* "http://localhost:3000/projects" */ "https://portfolio-2fp9.onrender.com/projects"
  ); // Use the custom hook

  useEffect(() => {
    if (data) {
      // Check if data is available
      setAllProjects(data); // Update the state with the fetched data
    }
  }, [data]); // Run this effect whenever the fetched data changes

  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.links a[href="#${id}"]`);

        if (entry.isIntersecting) {
          navLinks.forEach((navLink) => navLink.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  return (
    <>
      <Router>
        <div className="app">
          {loading && <Loading />}
          <Routes>
            <Route path="/" element={<Home allProjects={allProjects} />} />
            <Route path="/dashboard" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <div className="layout glass"></div>
        </div>
      </Router>
    </>
  );
}

export default App;
