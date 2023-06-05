import { useNavigate } from "react-router-dom";

export default function Navigation({ setModal }) {
  const navigate = useNavigate();
  return (
    <>
      <nav>
        <div className="navBarBottom">
          <div className="logoWrapper" onClick={() => navigate("/")}>
            Wabooo
          </div>
          <div className="links">
            <ul>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="buttons">
            <span onClick={() => setModal(true)}>Sign in</span>
          </div>
        </div>
      </nav>
    </>
  );
}
