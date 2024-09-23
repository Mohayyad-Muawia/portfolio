import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Loading from "./Loading";
import ShowProject from "./ShowProject";
import ContactForm from "./ContactForm";
import Nav from "./Nav";
import Footer from "./Footer";

const Home = ({ allProjects }) => {
  const [loading, setLoading] = useState(true);

  const [flProjects, setFlPrpjrcts] = useState(allProjects);

  //filter
  const filter = (type) => {
    setFlPrpjrcts(
      allProjects.filter((project) => {
        return project.type == type;
      })
    );
  };

  useEffect(() => {
    filter("fullstack");
  }, [allProjects]);
  const icons = [
    "fa-brands fa-html5",
    "fa-brands fa-css3-alt",
    "fa-brands fa-bootstrap",
    "fa-brands fa-square-js",
    "fa-brands fa-react",
    "fa-brands fa-node",
    "fa-solid fa-database",
    "fa-brands fa-github",
  ];

  const markTo = (x) => {
    document.querySelector(".mark").className = `mark ${x}`;
    // document.querySelector('.mark').classList.add = 'hi';
    console.log(x);
    console.log("hi");
  };

  const [projectToShow, setProjectToShow] = useState(null);
  const showProject = async (id) => {
    const project = allProjects.filter((project) => project._id === id);
    setProjectToShow(project[0]);
    document.querySelector(".layout").classList.add("active");
  };

  return (
    <>
      <Nav />

      <div className="home">
        <div className="logoBox section" id="home">
          <div className="circle-container">
            <div className="center-div">
              <img src="/white.png" alt="" />
            </div>
            {icons.map((icon, i) => (
              <span key={i} className="dot" style={{ "--i": i }}>
                <i className={icon}></i>
              </span>
            ))}
            <span className="wave" style={{ "--i": 1 }}></span>
            <span className="wave" style={{ "--i": 2 }}></span>
            <span className="wave" style={{ "--i": 3 }}></span>
            <span className="wave" style={{ "--i": 4 }}></span>
            <span className="wave" style={{ "--i": 5 }}></span>
            <span className="wave" style={{ "--i": 6 }}></span>
            <span className="wave" style={{ "--i": 7 }}></span>
          </div>
        </div>

        <div className="about-me section" id="about">
          <div className="main-title fade-right">
            <h1>about me</h1>
            <h3>personal info and skills</h3>
          </div>

          <div className="info">
            <h1 className="fade-left">
              Hello<span>,</span> I am Mohayyad Muawia
            </h1>
            <p className="fade-left">
              I am a <span>MERN Stack</span> Web Developer with great experience
              in this field.I used to both <span>Work Alone</span> and{" "}
              <span>Team Work</span>, so that I can design the website{" "}
              <span>UI</span> and develop both <span>Frontend</span> and{" "}
              <span>Backend</span> for the website. Currently studying{" "}
              <span>Software Engineering</span>, at Sudan University of Science
              and Technology <span>( SUST )</span>.{" "}
            </p>

            <a
              className="cv main-btn fade-left"
              href="/CV.pdf"
              download="/CV.pdf"
            >
              Download My Resume<i class="fa-solid fa-file-lines"></i>{" "}
            </a>

            <div className="personal">
              <p className="fade-left">
                <i class="fa-solid fa-user-large"></i> Mohayyad Muawia Elzubair
              </p>
              <p className="fade-left">
                <i class="fa-solid fa-earth-americas"></i> Sudanese
              </p>
              <p className="fade-left">
                <i class="fa-solid fa-person-arrow-up-from-line"></i> 18 years
                old
              </p>
              <p className="fade-left">
                <i class="fa-solid fa-location-dot"></i> Sudan North, Dongola
              </p>
              <p className="fade-left">
                <i class="fa-solid fa-phone"></i> +249 128502410
              </p>
              <p className="fade-left">
                <i class="fa-solid fa-envelope"></i> Mohayyad2.0@gmail.com
              </p>
              <p className="fade-left">
                <i class="fa-solid fa-language"></i> Arabic - English
              </p>
            </div>
          </div>

          <div className="skills">
            <h2 className="sub-title fade-right">Skills</h2>
            <div className="list">
              <div className="skill fade-top">
                <i class="fa-brands fa-html5"></i>
                <h3>HTML</h3>
              </div>
              <div className="skill fade-top">
                <i class="fa-brands fa-css3-alt"></i>
                <h3>CSS</h3>
              </div>
              <div className="skill fade-top">
                <i class="fa-brands fa-js"></i>
                <h3>JavaScript</h3>
              </div>
              <div className="skill fade-top">
                <i class="fa-brands fa-bootstrap"></i>
                <h3>Bootstrap</h3>
              </div>
              <div className="skill fade-top">
                <i class="fa-brands fa-react"></i>
                <h3>React js</h3>
              </div>
              <div className="skill fade-top">
                <i class="fa-brands fa-node"></i>
                <h3>Node js</h3>
              </div>
              <div className="skill fade-top">
                <i class="fa-brands fa-node-js"></i>
                <h3>Express js</h3>
              </div>
              <div className="skill fade-top">
                <i class="fa-solid fa-database"></i>
                <h3>MongoDB</h3>
              </div>
            </div>

            <div className="numbers">
              <div className="num fade-top">
                <h2>+40</h2>
                <p>Copmleted Projects</p>
              </div>
              <div className="num fade-top">
                <h2>~2</h2>
                <p>Years of Experience</p>
              </div>
              <div className="num fade-top">
                <h2>+800</h2>
                <p>Hours of Work</p>
              </div>
              <div className="num fade-top">
                <h2>+8</h2>
                <p>Web Technologies</p>
              </div>
            </div>
          </div>
        </div>

        <div className="main-title section fade-right" id="serv">
          <h1>services</h1>
          <h3>what I am great at</h3>
        </div>

        <div className="services">
          <div className="serv fade-in">
            <i class="fa-solid fa-code"></i>
            <h2>Frontend Developent</h2>
            <p>
              Landing pages, static websits, portfolios and more, I can do all
              that with my skills in frontend development. Whether using pure
              HTML, CSS and JavaScript... or with frameworks like React and
              Bootstrab, it was never a problem to me
            </p>
          </div>
          <div className="serv fade-in-1">
            <i class="fa-solid fa-server"></i>
            <h2>Backend Developent</h2>
            <p>
              Server side Programing, APIs making, Mongo Database, exprees
              routing, request and response fetching and even more, my
              capabilities know no limits when it comes to Web Development. I
              know I can do it
            </p>
          </div>
          <div className="serv fade-in-2">
            <i class="fa-solid fa-palette"></i>
            <h2>UI UX Design</h2>
            <p>
              Sometimes the project comes without a Ui UX pre-design, even that
              can't stop me; because I am already good at UI UX designing. most
              of my projects is designed by me. And I am sure that I can do
              more, just need a little push :)
            </p>
          </div>
        </div>

        <h2 className="sub-title fade-right">why me?</h2>
        <div className="reasons">
          <h4 className=" fade-right">
            I know there is too many web developers out there, so why would you
            choose me? let me tell you why:{" "}
          </h4>
          <ul>
            <li className=" fade-left">
              I am not any web developer, I am Mohayyad Muawia, a guy you can
              trust to do the right job with the right way in the right time.
            </li>
            <li className=" fade-left">
              className=" fade-left" Sometimes the things goes hard, new
              problems keeps showing up, but no problem I am sure I can find the
              solution.
            </li>
            <li className=" fade-left">
              Creativity, my work is always creative and unique, just relax and
              leave it to me.
            </li>
            <li className=" fade-left">
              Clean code, I can write clean and tidy code for future repair and
              upgrading purposes.
            </li>
            <li className=" fade-left">
              I can give you a warranty, so if any unexpected things happened, I
              will be right there to fix it.
            </li>
          </ul>
        </div>

        <div className="portfolio section" id="port">
          <div className="main-title fade-right">
            <h1>portfolio</h1>
            <h3>my masterpiece collection</h3>
          </div>

          <div className="prtojects-nav  fade-right">
            <a
              onClick={() => {
                markTo("a");
                filter("fullstack");
              }}
            >
              Full Stack Projects
            </a>
            <a
              onClick={() => {
                markTo("b");
                filter("frontend");
              }}
            >
              Frontend Projects
            </a>
            <a
              onClick={() => {
                markTo("c");
                setFlPrpjrcts(allProjects);
              }}
            >
              All Projects
            </a>
            <span className="mark a"></span>
          </div>

          <div className="projectsBox">
            {flProjects.map((project) => (
              <div
                className="project  fade-in"
                key={project._id}
                data-title={project.title}
                onClick={() => {
                  showProject(project._id);
                }}
              >
                <img
                  className="img-fluid"
                  src={`http://192.168.155.251:3000/${project.imageUrl}`}
                  alt=""
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {projectToShow && (
            <ShowProject
              project={projectToShow}
              setProject={setProjectToShow}
              loading={loading}
              setLoading={setLoading}
            />
          )}
        </div>

        <div className="contact section" id="contact">
          <div className="main-title fade-right">
            <h1>contact me</h1>
            <h3>feel free to get in touch anytime</h3>
          </div>

          <ContactForm />

          <h2 className="sub-title fade-right">my accounts</h2>
          <div className="accounts">
            <a
              href="https://www.facebook.com/profile.php?id=100085583352711&mibextid=ZbWKwL"
              target="_blanck"
              className="acc  fade-rghit"
              style={{ "--i": "170px" }}
            >
              <div className="icon">
                <i class="fa-brands fa-facebook-f"></i>
              </div>
              <span>Facebook</span>
            </a>

            <a
              href="https://www.instagram.com/mohayyadmuawia?igsh=YzU1NGVlODEzOA=="
              target="_blank"
              className="acc  fade-rghit"
              style={{ "--i": "175px" }}
            >
              <div className="icon">
                <i class="fa-brands fa-instagram"></i>
              </div>
              <span>Instagram</span>
            </a>

            <a
              href="https://www.linkedin.com/in/mohayyad-muawia-722255279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              className="acc  fade-rghit"
              style={{ "--i": "160px" }}
            >
              <div className="icon">
                <i class="fa-brands fa-linkedin-in"></i>
              </div>
              <span>Linked In</span>
            </a>

            <a
              href="https://github.com/Mohayyad-Muawia"
              target="_blank"
              className="acc  fade-rghit"
              style={{ "--i": "150px" }}
            >
              <div className="icon">
                <i class="fa-brands fa-github"></i>
              </div>
              <span>Git Hub</span>
            </a>

            <a
              href="https://wa.me/249128502410"
              target="_blank"
              className="acc  fade-rghit"
              style={{ "--i": "175px" }}
            >
              <div className="icon">
                <i class="fa-brands fa-whatsapp"></i>
              </div>
              <span>Whatsapp</span>
            </a>

            <a
              href="https://x.com/Not_Mohayyad?t=ISWXmwxV6sNvZJfo_aIMiw&s=09"
              target="_blank"
              className="acc  fade-rghit"
              style={{ "--i": "165px" }}
            >
              <div className="icon">
                <i class="fa-brands fa-x-twitter"></i>
              </div>
              <span>X-Twitter</span>
            </a>

            <a
              href="mailto: mohayyad2.0@gmail.com"
              target="_blanck"
              className="acc fade-rghit"
              style={{ "--i": "140px" }}
            >
              <div className="icon">
                <i class="fa-solid fa-at"></i>
              </div>
              <span>Email</span>
            </a>

            <br />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
