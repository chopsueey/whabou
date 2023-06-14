import { Link, Outlet, useNavigate } from "react-router-dom";
import GeneralStore from "../store/GeneralContext";
import logo from "../assets/Logo123.png";
import { userLogout } from "./UserFunctions";
import { useState } from "react";

export default function Navigation() {
  const navigate = useNavigate();
  const { modal, setModal, isLoggedIn, setIsLoggedIn } = GeneralStore();
  return (
    <>
      <div className="contentWrapper">
        <nav>
          <div className="navBarBottom">
            <div onClick={() => navigate("/")}>
              <Link>
                <img style={{ width: "25%" }} src={logo} alt="wabooo logo" />
              </Link>
            </div>
            <div className="links">
              <ul>
                <Link>About</Link>
                <Link>Contact</Link>
              </ul>
            </div>
            <div className="buttons">
              {isLoggedIn ? (
                <button
                  onClick={userLogout}
                  style={{ backgroundColor: "blue", color: "yellow" }}
                >
                  Logout
                </button>
              ) : (
                <span onClick={() => setModal(true)}>Sign in</span>
              )}
            </div>
          </div>
        </nav>
        <Outlet />
      </div>
    </>
  );
}
