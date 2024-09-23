import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav>
        <div className="links">
          <a href="#home" className="active" data-info="Home">
            <i class="fa-solid fa-house"></i>
          </a>
          <a href="#about" data-info="About Me">
            <i class="fa-solid fa-user"></i>
          </a>
          <a href="#serv" data-info="Serivces">
            <i class="fa-solid fa-hand-holding-heart"></i>
          </a>
          <a href="#port" data-info="Portfolio">
            <i class="fa-solid fa-briefcase"></i>
          </a>
          <a href="#contact" data-info="Contact Me">
            <i class="fa-solid fa-paper-plane"></i>
          </a>
          {/* <Link to="/dashboard" data-info="Dashboard">
            <i class="fa-solid fa-gear"></i>
          </Link> */}
        </div>
      </nav>
    </>
  );
};

export default Nav;
