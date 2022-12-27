import './search.css';
import React, { useState } from "react";


function SearchFair() {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(!open);
    };
  
    const handleMenuOne = () => {
      console.log("Sexta Feira")
      setOpen(false);
    };
  
    const handleMenuTwo = () => {
      // do something
      console.log("Domingo")

      setOpen(false);
    };
  
    return (
      <div className="dropdown">
        <h2>Filtros</h2>
        <label>Pesquisar feiras: </label>
        <button onClick={handleOpen}>Pesquise feiras por dia da semana</button>
        {open ? (
          <ul className="menu">
            <li className="menu-item">
              <button onClick={handleMenuOne}>Sexta feira</button>
            </li>
            <li className="menu-item">
              <button onClick={handleMenuTwo}>Domingo</button>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
  
  export default SearchFair;
  