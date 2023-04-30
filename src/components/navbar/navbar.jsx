import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(true);

  /* These are two different implementations of the `handleScroll` function that is used as an event
listener for the `scroll` event on the `window` object. */
  const handleScroll = () => {
    setActive(window.scrollY > 150);
  };

  // const handleScroll = () => {
  //   window.scrollY > 150 ? setActive(true) : setActive(false);
  // };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => () => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={active ? "navbar active" : "navbar"}>
      <div className="container">
        <Link to="/">
          <p>TRACOIN</p>
        </Link>

        <div className="links topBotomBordersOut">
          <a onClick={scrollToSection("hero")}>Home</a>
          <a onClick={scrollToSection("market")}>Market</a>
        </div>
        <span className="icons-container">
          <a href="https://github.com/arrabisPiolo" target="_blank">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/piolo-arrabis/" target="_blank">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </span>
      </div>
    </div>

    // <nav className={isSticky ? "sticky-nav" : ""}>
    //   <div className="navbar">
    //     <div className="container topBotomBordersOut">
    //       <a onClick={scrollToSection("hero")}>Home</a>
    //       <a onClick={scrollToSection("market")}>Market</a>
    //       <a>Choose Us</a>
    //       <a>Join </a>
    //     </div>
    //     <span>
    //       <i className="fa-brands fa-twitter"></i>
    //       <i className="fa-brands fa-discord"></i>
    //     </span>
    //   </div>
    // </nav>
  );
};

export default Navbar;
