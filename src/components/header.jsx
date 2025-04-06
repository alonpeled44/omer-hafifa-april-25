import React from "react";

export default function Header() {
  return (
    <>
      <header>
        <div class="logo-header">
          <img src="/photos/pokemon-photo.png" alt="pokemon-photo" />
          <p id="header-text">pokemon</p>
        </div>

        <div id="date"></div>
      </header>
    </>
  );
}
