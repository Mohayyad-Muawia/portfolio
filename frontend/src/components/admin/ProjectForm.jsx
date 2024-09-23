import React, { useState, useRef } from "react";

const ProjectForm = ({ setAllProjects }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    type: "fullstack",
  });
  const [technologies, setTechnologies] = useState("");
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeoutRef = useRef(null); // Ref to store the timeout ID

  const refreshProjects = async () => {
    try {
      const response = await fetch("https://portfolio-2fp9.onrender.com/projects");
      const data = await response.json(); // Parse the JSON data from the response
      setAllProjects(data); // This will trigger a rerender
      console.log(data); // Check the fetched data
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTechsChange = (e) => {
    setTechnologies(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const fileBtn = document.querySelector(".fileBtn");
    fileBtn.textContent = e.target.files[0].name;
    fileBtn.classList.add("selected");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setUploadStatus({
      message: "uploading project",
      type: "sending",
      icon: "fa-solid fa-spinner",
    });

    if (!image) {
      setUploadStatus({
        message: "Please select an image to upload.",
        type: "error",
        icon: "fa-solid fa-square-xmark",
      });

      setIsSubmitting(false);
      return;
    }
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("url", formData.url);
    data.append("type", formData.type);

    const techArray = technologies.split("-").map((skill) => skill.trim());
    techArray.forEach((tech) => data.append("technologies[]", tech));

    data.append("image", image);

    try {
      const response = await fetch("https://portfolio-2fp9.onrender.com/add", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus({
          message: "Project uploaded successfully!",
          type: "success",
          icon: "fa-solid fa-envelope-circle-check",
        });
        setFormData({ title: "", description: "", url: "" });

        //clear img input
        setImage(null);
        const fileBtn = document.querySelector(".fileBtn");
        fileBtn.innerHTML = ` <i class="fa-solid fa-image"></i> <span>Choose Image</span>`;
        fileBtn.classList.remove("selected");

        setTechnologies(""); // Clear the technologies field

        // Re-fetch the updated projects list
        refreshProjects();
        toggleAddForm(); // Close the form after successful upload

        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set a new timeout to clear the upload status message
        timeoutRef.current = setTimeout(() => {
          setUploadStatus("");
        }, 3000); // Message will disappear after 3 seconds
      } else {
        setUploadStatus({
          message: "Sorry, something went wrong. Please try again",
          type: "error",
          icon: "fa-solid fa-square-xmark",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="projectForm">
        <h1>Upload New Project</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="half">
            <label>Project Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="new Project"
            />
          </div>
          <div className="half">
            <label>Project Link:</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              placeholder="http://linktoproject.com"
            />
          </div>
          <div className="half">
            <label>Technologies:</label>
            <input
              type="text"
              name="technologies"
              value={technologies}
              onChange={handleTechsChange}
              placeholder="html - css - js"
              required
            />
          </div>
          <div className="half">
            <label>Image:</label>
            <label className="fileBtn" htmlFor="file">
              <i className="fa-solid fa-image"></i> <span>Choose Image</span>
            </label>
            <input
              id="file"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="select-box">
            <label>Type:</label>
            <select
              name="type"
              value={formData.type}
              id=""
              onChange={handleChange}
            >
              <option value="fullstack">Fullstack Project</option>
              <option value="frontend">Only Frontend Project</option>
            </select>
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="my project description"
            />
          </div>

          <button className="main-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Upload Project"}{" "}
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </button>
        </form>
      </div>

      {uploadStatus && (
        <div className={` send-state ${uploadStatus.type}`}>
          <i className={uploadStatus.icon}></i>
          {uploadStatus.message}
        </div>
      )}
    </>
  );
};

export default ProjectForm;
