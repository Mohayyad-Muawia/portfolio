import { useState, useEffect } from "react";

const ContactForm = () => {
  const [isFly, setIsFly] = useState(false);
  const fly = () => {
    setIsFly(true);
    setTimeout(() => {
      setIsFly(false);
    }, 2100);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sendState, setSendState] = useState(null);

  const clearForm = () => {
    setTimeout(() => {
      setSendState(null);
    }, 9000);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fly();

    setSendState({
      message: "Sending Email, please wait",
      type: "sending",
      icon: "fa-solid fa-spinner",
    });

    try {
      const response = await fetch("https://portfolio-2fp9.onrender.com/projects/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSendState({
          message:
            "Email sent successfully, I will contact you as soon as I can",
          type: "success",
          icon: "fa-solid fa-envelope-circle-check",
        });
      } else {
        setSendState({
          message: "Sorry, something went wrong. Please try again",
          type: "error",
          icon: "fa-solid fa-square-xmark",
        });
      }

      // Clear the message after 5 seconds
      clearForm();
    } catch (error) {
      setSendState({
        message: "Failed to connect the server, try again or ask for support",
        type: "error",
        icon: "fa-solid fa-square-xmark",
      });
      clearForm();
    }
  };
  window.localStorage.clear();

  return (
    <>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="fade-left">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="fade-left">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your Email so I can replay to you"
            />
          </div>

          <div className="fade-left">
            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Enter a message"
            />
          </div>

          <button type="submit" className="main-btn fade-left">
            Send Email
            <i className={`fa-solid fa-paper-plane ${isFly ? "fly" : ""}`}></i>
          </button>
        </form>

        {sendState && (
          <div className={`send-state ${sendState.type}`}>
            <i className={sendState.icon}></i>
            {sendState.message}
          </div>
        )}
      </div>
    </>
  );
};

export default ContactForm;
