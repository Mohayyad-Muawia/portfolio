const ShowProject = ({ project, setProject, loading, setLoading }) => {
  const closeShow = () => {
    setProject(null);
    document.querySelector(".layout").classList.remove("active");
    setLoading(true);
  };

  const handleImageLoad = () => {
    setLoading(null);
    console.log(loading);
  };
  return (
    <>
      <div className="showProject">
        {loading && (
          <div className="project-loading glass">
            <div className="load"></div>
            <img src="/logo.png" alt="" width="120px" />
          </div>
        )}

        <div className="project-info">
          <img
            className="img-fluid"
            src={`https://portfolio-2fp9.onrender.com/${project.imageUrl}`}
            alt=""
            onLoad={handleImageLoad}
          />
          <div className="text">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <h4>Technologies:</h4>
            <ul>
              {project.technologies.map((tech) => (
                <li> {tech} </li>
              ))}
            </ul>
          </div>
          <div className="btns">
            <a className="sec-btn glass" onClick={closeShow}>
              Close
            </a>
            <a target="_blank" className="main-btn" href={project.url}>
              Visit Site
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowProject;
