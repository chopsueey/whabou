import { Link, Outlet, useNavigate } from "react-router-dom";
import GeneralStore from "../store/GeneralContext";
import logo from "../assets/Logo123.png";
import { userLogout } from "./UserFunctions";
import Footer from "./Footer";

export default function Navigation() {
  const navigate = useNavigate();
  const { modal, setModal, isLoggedIn, setIsLoggedIn } = GeneralStore();
  return (
    <>
      <div className="container mx-auto" style={{ color: "white" }}>
        <nav className="row border-2 flex justify-between">
          <div onClick={() => navigate("/")}>
            <Link>
              <img style={{ aspectRatio: "1/1", width: "100px"}} src={logo} alt="wabooo logo" />
            </Link>
          </div>
          <ul className="links flex">
            <Link>
              <li>About</li>
            </Link>
            <Link>
              <li>Contact</li>
            </Link>
          </ul>

          <div className="buttons">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  userLogout();
                  setIsLoggedIn(false);
                  navigate("/logout");
                }}
                style={{ backgroundColor: "blue", color: "yellow" }}
              >
                Logout
              </button>
            ) : (<>
              <span style={{cursor: "pointer"}} onClick={() => setModal(true)}>Sign in</span>
              {/* <span style={{cursor: "pointer"}} onClick={() => d.showModal()}>Sign in</span> */}
            </>
            )}
          </div>
        </nav>
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
