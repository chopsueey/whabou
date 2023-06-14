import { Link, Outlet, useNavigate } from "react-router-dom";
import GeneralStore from "../store/GeneralContext";
import logo from "../assets/Logo123.png"

export default function Navigation() {
  const navigate = useNavigate();
  const {modal, setModal} = GeneralStore()
  return (
    <>
    
    <div className="contentWrapper">
    <nav>
      <div className="navBarBottom">
        <div  onClick={() => navigate("/")}>
          <Link>
          <img style={{width: "25%"}} src={logo} alt="wabooo logo" />
          </Link>
        </div>
        <div className="links">
          <ul>
            <Link>About</Link>
            <Link>Contact</Link>
          </ul>
        </div>
        <div className="buttons">
          <span onClick={() => setModal(true)}>Sign in</span>
        </div>
      </div>
    </nav>
    <Outlet/>
    </div>
    
    </>
  );
}
