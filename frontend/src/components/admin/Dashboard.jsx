import { useEffect, useState } from "react";
import ProjectForm from "./ProjectForm";
import ShowProject from "../ShowProject";
import useFetch from "../useFetch";
import Loading from "../Loading";

const Dashboard = () => {
  const [allProjects, setAllProjects] = useState();
  const [projectToShow, setProjectToShow] = useState(null);

  const { data, loading, error } = useFetch(
    "http://192.168.155.251:3000/projects"
  ); // Use the custom hook

  useEffect(() => {
    if (data) {
      // Check if data is available
      setAllProjects(data); // Update the state with the fetched data
    }
  }, [data]); // Run this effect whenever the fetched data changes

  const showProject = async (id) => {
    const project = allProjects.filter((project) => project._id === id);
    setProjectToShow(project[0]);
    document.querySelector(".layout").classList.add("active");
  };
  const deleteProject = async (id) => {
    const response = await fetch(`http://192.168.155.251:3000/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      // Check if the deletion was successful
      setAllProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
      );
    }
  };

  return (
    <>
      <div className="dashboard">
        <a className="homeBtn" href="/">
          <i class="fa-solid fa-house"></i>
        </a>

        <ProjectForm setAllProjects={setAllProjects} />

        <h1>All Projects</h1>
        <div className="show-projects">
          {allProjects &&
            allProjects.map((project) => (
              <div
                className="project"
                key={project._id}
                data-title={project.title}
                onClick={() => {
                  showProject(project._id);
                }}
              >
                <div className="options">
                  <i
                    onClick={() => {
                      deleteProject(project._id);
                    }}
                    id="delet"
                    className="fa-solid fa-trash-can"
                  ></i>
                </div>
                <img
                  className="img-fluid"
                  src={`http://localhost:3000/${project.imageUrl}`}
                  alt="project"
                />
              </div>
            ))}
        </div>

        {projectToShow && (
          <ShowProject project={projectToShow} setProject={setProjectToShow} />
        )}
      </div>
      {loading && <Loading />}
    </>
  );
};

export default Dashboard;
