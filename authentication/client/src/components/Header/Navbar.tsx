import * as React from "react";
import { Link } from "react-router-dom";
import { SlUser } from "react-icons/sl";
function Navbar() {

  let date: any = new Date()
  date = date.getDate() + ' ' + date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
  return (
    <header>
      <nav
        className="navbar navbar-expand-lg"
        style={{ zIndex: "1000", backgroundColor: 'black' }}
      >
        <div className="container d-flex align-items-center justify-content-between">
          <h2 className="text-white m-0" >LOGO</h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div>
            <span className="text-white">
              {date}
            </span>
          </div>
          <div>
            <div className="collapse navbar-collapse " id="navbarSupportedContent">
              <Link to='/login' className="text-white ms-auto " >
                <SlUser size={25} />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
