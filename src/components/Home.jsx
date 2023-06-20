import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister, userLogin } from "./UserFunctions.jsx";
import GeneralStore from "../store/GeneralContext";

export default function Home() {
  const navigate = useNavigate();

  const { modal, setModal, setUserId, setIsLoggedIn } = GeneralStore();

  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const data = { name, email, password };
    console.log(data);
    setRegister(false);
    setName("");
    setEmail("");
    setPassword("");
    if (!register) {
      const loginAttempt = await userLogin(data);
      if (loginAttempt) {
        setUserId(loginAttempt.userId);
        console.log(loginAttempt.userId)
        setIsLoggedIn(true)
        setModal(false);
        navigate("/dashboard");
        return;
      }
      return;
    }
    await userRegister(data);
    setModal(false);
  };

  return (
    <div className="contentWrapper">
      {modal && (
        <div className="modal">
          <form action="">
            <span onClick={() => setModal(false)}>Close</span>
            <h3>{register ? "Sign up" : "Log into your account!"}</h3>
            {register && (
              <>
                <label>
                  Name
                  <input
                    type="text"
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                  />
                </label>
              </>
            )}
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
              />
            </label>
            <button onClick={handleSubmit}>
              {register ? "Create account" : "Sign in"}
            </button>
            {register ? (
              <p className="register">
                <span onClick={() => setRegister(false)}>To sign in</span>
              </p>
            ) : (
              <p className="register">
                Not signed up yet?{" "}
                <span onClick={() => setRegister(true)}>Sign up!</span>
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
