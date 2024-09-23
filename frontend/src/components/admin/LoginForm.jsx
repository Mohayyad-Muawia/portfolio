import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ correct, setCorrect }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(" ");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    document.querySelector(".password").classList.remove("wrong");

    const response = await fetch("https://portfolio-2fp9.onrender.com/projects/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    const json = await response.json();
    window.localStorage.setItem("admin", json.correct);
    setCorrect(json.correct);

    if (!correct) {
      setError("Wrong Password");
      document.querySelector(".password").classList.add("wrong");
    }
  };

  return (
    <>
      <div className="login">
        <form action="" onSubmit={handleSubmit}>
          <h1>Log in</h1>
          <input type="text" value="Mohayyad Muawia" readOnly />

          <input
            type="password"
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
            autoFocus
          />
          <span>{error}</span>

          <div className="btns">
            <Link to="/" className="sec-btn">
              <i class="fa-solid fa-reply-all"></i> Back to Home{" "}
            </Link>
            <button type="submit" className="main-btn">
              Log in <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
