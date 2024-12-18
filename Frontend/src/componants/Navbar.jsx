import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({loginOrLogout}) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("home");
  const [sideBarVisible, setSideBarVisible] = useState("none");

  const handleSideBar = () => {
    setSideBarVisible(sideBarVisible == "none" ? "block" : "none");
  };

  useEffect(() => {
    // Set active link based on current path
    if (location.pathname === "/Login") {
      setActiveLink("login");
    } else if (location.pathname === "/") {
      setActiveLink("home");
    }else if (location.pathname === "/SignUp") {
      setActiveLink("signup");
    } else if (location.pathname === "/Registration") {
      setActiveLink("Registraion");
    } else if (location.pathname === "/About") {
      setActiveLink("about");
    } else {
      setActiveLink(""); // reset if on another route
    }
  }, [location.pathname]);

  return (
    <div>
      <nav className="navbar bg-dark navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            GoLocal
          </Link>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeLink === "home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeLink === "about" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/About"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  className={`nav-link ${
                    activeLink === "Registraion" ? "active" : ""
                  }`}
                  to="/Registration"
                >
                  Become a Seller
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav mx-5">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeLink === "login" ? "active" : ""
                  }`}
                  to="/Login"
                >
                  {loginOrLogout=="logout" ? "logout" : "Login"}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeLink === "signup" ? "active" : ""
                  }`}
                  to="/SignUp"
                >
                  SignUp
                </Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>

            <GiHamburgerMenu
              className="mx-2"
              style={{
                cursor: "pointer",
                color: "white",
                width: "40px",
                fontSize: "25px",
              }}
              onClick={handleSideBar}
            />
          </div>
        </div>
      </nav>

      <div
        className="sidebar border border-2"
        style={{
          width: "250px",
          position: "absolute",
          right: sideBarVisible ? 0 : "-250px",
          height: "90vh",
          display: `${sideBarVisible}`,
          backgroundColor: "whitesmoke",
          transition: "right 0.3s ease-in-out",
        }}
      >
        <ul className="py-3">
          <Link to="/SellerProfile">
            <li>Profile</li>
          </Link>
          <Link>
            <li>Browse Products</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
