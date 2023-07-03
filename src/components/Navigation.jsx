import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import GeneralStore from "../store/GeneralContext";
import logo from "../assets/Logo123.png";
import { userLogout } from "../fetchRequests/UserRequests";
import Footer from "./Footer";
import UserPanel from "./UserPanel";

export default function Navigation() {
  const navigate = useNavigate();
  const { setModal, hasCookie, setHasCookie } = GeneralStore();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    await userLogout();
    setLogoutLoading(false);
    setHasCookie(false);
    navigate("/logout");
  };

  return (
    <>
      <div className="p-6 sm:p-0" style={{ color: "grey" }}>
        <nav className="row border-2 flex flex-col">
          {/* navlinks + signin/logout button */}
          <div className="flex justify-between">
            <div className="flex" onClick={() => navigate("/")}>
              <Link>
                <img
                  style={{ aspectRatio: "1/1", width: "100px" }}
                  src={logo}
                  alt="wabooo logo"
                />
              </Link>
              <ul className="links flex items-center">
                <Link>
                  <li>About</li>
                </Link>
                <Link>
                  <li>Contact</li>
                </Link>
              </ul>
            </div>

            <div className="buttons flex items-center">
              {hasCookie || document.cookie.includes("isLoggedIn") ? (
                <button
                  className={`mt-4 mr-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-medium px-5 py-1 text-center ${
                    logoutLoading ? "cursor-not-allowed opacity-75" : ""
                  }`}
                  onClick={handleLogout}
                  disabled={logoutLoading}
                >
                  {logoutLoading ? (
                    <div className="flex items-center">
                      <div className="mr-2 animate-spin">
                        <svg
                          className="w-5 h-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M16 12a4 4 0 1 1-8 0m8 0H8" />
                        </svg>
                      </div>
                      Logging out...
                    </div>
                  ) : (
                    "Logout"
                  )}
                </button>
              ) : (
                <span
                  className="mt-4 mr-2 text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br hover:from-gray-400 hover:via-gray-500 hover:to-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center mx-auto block max-w-[10rem] mb-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setModal(true)}
                >
                  Sign in
                </span>
              )}
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
      {/* mobile user panel */}
      <section className="fixed bottom-0 left-0 w-full m-0 bg-white sm:hidden">
        <UserPanel />
      </section>
      <Footer />
    </>
  );
}
