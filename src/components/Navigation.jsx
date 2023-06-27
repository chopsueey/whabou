import { Link, Outlet, useNavigate } from "react-router-dom";
import GeneralStore from "../store/GeneralContext";
import logo from "../assets/Logo123.png";
import { userLogout } from "../fetchRequests/UserRequests";
import Footer from "./Footer";

export default function Navigation() {
  const navigate = useNavigate();
  const { setModal, hasCookie, setHasCookie } = GeneralStore();

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

            <div className="buttons">
              {hasCookie || document.cookie.includes("isLoggedIn") ? (
                <button
                  onClick={async () => {
                    await userLogout();
                    setHasCookie(false);
                    navigate("/logout");
                  }}
                  style={{ backgroundColor: "blue", color: "yellow" }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setModal(true)}
                  >
                    Sign in
                  </span>
                </>
              )}
            </div>
          </div>
          {/* searchbar */}

          {/* <form className="mb-3">
            <input type="text" placeholder="mehr stylen alex, mehr mehr mehr" />
            <button className="bg-sky-500 text-white">search</button>
          </form> */}
        </nav>
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
