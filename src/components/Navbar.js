import React from "react";
import "../css/navBar.css";

const Navbar = props => {
  const projUnitNos = [1, 2, 3, 4];
  const batchUnitNos = [0,7];

  const unitSelectionCheckboxes = projUnitNos.map(no => {
    return (
      <div className="checkbox" key = {no}>
        <label className="form-check-label">
          <input
            className="form-check-input"
            type="checkbox"
            value={no}
            defaultChecked
            onClick={event => props.onProjFilterClick(event.target.value)}
          />
          Unit {no}
        </label>
      </div>
    );
  });

  return (
    <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
      <button
        className="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <a className="navbar-brand" href="#">
        <strong>GA WDI Course Alumni</strong>
      </a>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {props.viewing === "projects" &&
            <li className="nav-item active">
              <a
                className="nav-link"
                href="#"
                onClick={() => props.onButtonClick("alumni")}
              >
                View By Alumni<span className="sr-only">(current)</span>
              </a>
            </li>}

          {props.viewing === "alumni" &&
            <li className="nav-item active">
              <a
                className="nav-link"
                onClick={() => props.onButtonClick("projects")}
                href="#"
              >
                View By Projects
              </a>
            </li>}
          {props.viewing === "projects" &&
            <li className="nav-item active">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  View Project By Unit
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <form>
                    {unitSelectionCheckboxes}
                  </form>
                </div>
              </div>
            </li>}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
