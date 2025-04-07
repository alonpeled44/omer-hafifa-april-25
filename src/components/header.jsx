import React from "react";
import pokemonIcon from "../photos/pokemon-photo.png";
export default function Header() {
  return (
    <>
      <header>
        <div className="logo-header">
          <img src={pokemonIcon.src} />
          <p id="header-text">pokemon</p>
        </div>

        <div id="date"></div>
      </header>
    </>
  );
}
