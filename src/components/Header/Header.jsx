import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className='header-container'>
      <nav>
        <a href='#' style={{ marginRight: "10px" }}>
          Home
        </a>
        <a href='#' style={{ marginRight: "10px" }}>
          About
        </a>
        <a href='#'>Episodes</a>
      </nav>
      <button className='theme-button'>Dark Mode</button>
    </header>
  );
}

export default Header;
