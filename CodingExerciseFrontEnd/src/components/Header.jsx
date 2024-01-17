import React, { useState, Fragment, useEffect } from 'react';
import { Link } from "react-router-dom";


export default function Header() {

  const [username, setUserName] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("loggedUser"));
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedUser");
    window.location.href = "/";
  };
  const login = (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedUser");
    window.location.href = "/login";
  };

  const AddPresentation = (e) => {
    e.preventDefault();
    window.location.href = "/add";
  }

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className={`navbar-nav mr-auto ${username === '' || username === null ? 'hiddenNav' : ''}`} >
            <li className="nav-item active">
              {
               username && username.length > 0 ?
                  <Link className="nav-link" >
                    Welcome <span className="sr-only">(current)</span>
                    ( {username} )
                  </Link>
                  : ''
              }
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            {
              username === undefined || username === null || username.length === 0 ?
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  onClick={(e) => login(e)}
                >
                  Login
                </button> 
                :
                <>
                <button
                  className="btn btn-outline-success my-2 my-sm-0"                 
                  onClick={(e) => AddPresentation(e)}
                >
                  Add Presentation
                </button>
                &nbsp;&nbsp;
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  onClick={(e) => logout(e)}
                >
                  Logout
                </button>
                </>
            }
          </form>
        </div>
      </nav>
    </Fragment>
  );
}